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
  const { user } = useBggUser();
  const [loading, setLoading] = useState(false); // used for nav refresh spin animation
  const [showProgress, setShowProgress] = useState(false); // used for progress bar
  const [percentDone, setPercentDone] = useState(0); // used for progress bar
  const [error, setError] = useState(null);
  const [userFirstTime, setUserFirstTime] = useState(false);
  const { handleFiltering } = useFilteredData();
  const { addFetchedUser, isUserFetched } = useUsersFetched();
  const username = user?.username;

  const handleFetching = async (user: UserInfo, force = false) => {
    try {
      if (!user) {
        throw Error("We cannot fetch user play data unless a user is set.");
      }

      if (!force) {
        // don't get data if it's already been fetched this session
        let fetched = isUserFetched(username);
        if (fetched) return;
      }

      const { latestPlayDate, latestPlayId } = await getLatestPlayData(
        user.userId
      );

      // some play data already exists
      if (latestPlayDate && latestPlayId) {
        const latestPlaysInfo = await getLatestPlaysInfo(
          username,
          latestPlayDate
        );

        if (!latestPlaysInfo) return;

        if (latestPlayId === latestPlaysInfo.latestPlayId) return;
        setShowProgress(true);
        setLoading(true);

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

        setLoading(false);
        addFetchedUser(username);
        setError(null);
      } else {
        // this is the first time downloading play data
        setUserFirstTime(true);
        const initialData = await getInitialPlayData(username);
        if (initialData.pages === 0) {
          return;
        }

        setShowProgress(true);
        setLoading(true);

        const allPlayData = await getPlayDataWithExponentialBackingOff({
          username: username,
          pages: initialData.pages,
          setPercentDone,
        });

        bulkAddPlays(allPlayData);

        if (handleFiltering) {
          handleFiltering();
        }

        setLoading(false);
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

  const manuallyUpdate = async (e: any) => {
    e.preventDefault();
    await handleFetching(user, true);
  };

  useEffect(() => {
    if (username) {
      handleFetching(user);
    }
  }, [user]);

  return {
    percentDone,
    manuallyUpdate,
    error,
    userFirstTime,
    showProgress,
    loading,
  };
}

export default usePlayData;
