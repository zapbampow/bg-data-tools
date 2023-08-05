import { useEffect, useState } from "react";
import { UserInfo } from "~/models/bgg/userInfo";
import { bulkAddPlays } from "~/services/db";
import { getLatestPlayData } from "~/services/idbService";
import {
  getInitialPlayData,
  getPlayDataWithExponentialBackingOff,
  getLatestPlaysInfo,
} from "~/services/bggService";
import { useBggUser } from "./useBggUser";
import useFilteredData from "~/contexts/useFilteredData.tsx";
import useUsersFetched from "./useUsersFetched.tsx";

/**
 * This is a hook to encapsulate the getting and storing of data into indexedDB.
 *
 * Whatit  should do?
 * 1. Check for existing data in IndexedDB
 * 2. Check whether there is new data to add from BGG.
 * 3. Add new data to the db
 * 4. Return percentRetrieved, function to manually update, errors
 *
 * What it isn't going to do?
 * 1. Return all the data
 */

function usePlayData() {
  const { user } = useBggUser() as { user: UserInfo };
  const [showProgress, setShowProgress] = useState(false);
  const [percentDone, setPercentDone] = useState(0);
  const [error, setError] = useState(null);
  const [userFirstTime, setUserFirstTime] = useState(false);
  // const [fetching, setFetching] = useState(false); // prevents repeatedly fetching on load
  const { handleFiltering } = useFilteredData();
  const { addFetchedUser, isUserFetched } = useUsersFetched();

  const username = user?.username;

  const handleFetching = async (user: UserInfo) => {
    try {
      if (!user) {
        throw Error("We cannot fetch user play data unless a user is set.");
      }

      // don't get data if it's already been fetched this session
      let fetched = isUserFetched(username);
      if (fetched) return;

      const { latestPlayDate, latestPlayId } = await getLatestPlayData(
        user.userId
      );

      // some play data already exists
      if (latestPlayDate && latestPlayId) {
        const latestPlaysInfo = await getLatestPlaysInfo(
          username,
          latestPlayDate
        );

        if (latestPlayId === latestPlaysInfo.latestPlayId) return;
        setShowProgress(true);

        const latestPlays = await getPlayDataWithExponentialBackingOff({
          username: username,
          pages: latestPlaysInfo.pages,
          startdate: latestPlayDate,
          setPercentDone,
        });
        const unrecordedPlays = latestPlays.filter(
          (play) => play.playId > latestPlayId
        );
        bulkAddPlays(unrecordedPlays);
        if (handleFiltering) {
          handleFiltering();
        }
        addFetchedUser(username);
        setError(null);
      } else {
        // this is the first time downloading play data
        setUserFirstTime(true);
        const initialData = await getInitialPlayData(username);
        const allPlayData = await getPlayDataWithExponentialBackingOff({
          username: username,
          pages: initialData.pages,
          setPercentDone,
        });
        bulkAddPlays(allPlayData);
        if (handleFiltering) {
          handleFiltering();
        }
        setShowProgress(true);
        addFetchedUser(username);
        setError(null);
      }
    } catch (err) {
      console.log(err);
      setPercentDone(0);
      // @ts-ignore
      setError(err.message);
      // @ts-ignore
      throw Error(err);
    }
  };

  useEffect(() => {
    if (username) {
      handleFetching(user);
    }
  }, [user]);

  return {
    percentDone,
    manuallyUpdate: () => handleFetching(user),
    error,
    userFirstTime,
    showProgress,
  };
}

export default usePlayData;
