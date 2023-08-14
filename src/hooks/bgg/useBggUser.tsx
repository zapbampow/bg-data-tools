import { getUserInfo } from "~/services/bggService";
import type { UserInfo } from "~/models/bgg/userInfo";
import { db } from "~/services/db";
import usageDb from "~/services/usageService";
import {
  useUser,
  useError,
  useLoading,
} from "~/contexts/userContext/userContextHooks.tsx";

export function useBggUser() {
  // const { username } = useParams();
  const { user, setUser } = useUser();
  const { loading, setLoading } = useLoading();
  const { error, setError } = useError();

  const getUser = async (username: string) => {
    setLoading(true);
    setError(undefined);

    const dbUserInfo = await db.users
      .where("username")
      .equals(username)
      .first();

    // only hit the bgg api to get user if a user with that username doesn't already exist
    if (dbUserInfo) {
      setUser(dbUserInfo);
      setLoading(false);
      return dbUserInfo;
    } else {
      const userInfo = await getUserInfo(username);
      if (!userInfo) {
        setError(
          "There was an error getting user info from BGG. Please try again later."
        );
        return;
      }

      let isARealUser = isValidUser(userInfo);

      if (!isARealUser) {
        setError(
          `"${username}" doesn't seem to be a valid user. Please check your spelling and try again.`
        );
      }

      if (userInfo) {
        setUser(userInfo);
        addUserToIndexDB(userInfo);
        const existingUser = await usageDb.users.getByUsername(username);

        if (!existingUser) {
          // add user to usage db
          usageDb.users.add({
            username: userInfo.username,
            bggUserId: userInfo.userId,
          });
        }
        setLoading(false);
        return userInfo;
      }
    }
  };

  return { user, getUser, loading, error };
}

const addUserToIndexDB = async (userInfo: UserInfo) => {
  try {
    await db.users.add(userInfo);
  } catch (err) {
    // console.log(err);
  }
};

const isValidUser = (userInfo: UserInfo) => {
  console.log("userInfo", userInfo);
  const {
    avatarLink,
    country,
    name,
    stateOrProvince,
    userId,
    username,
    yearRegistered,
  } = userInfo;
  const isValidStringVal = (item: string) =>
    item !== "N/A" && item.trim().length > 0;
  const isValidNumVal = (item: number) => !isNaN(item);

  return (
    isValidStringVal(avatarLink) ||
    isValidStringVal(country) ||
    isValidStringVal(name) ||
    isValidStringVal(stateOrProvince) ||
    isValidNumVal(userId) ||
    isValidStringVal(username) ||
    isValidNumVal(yearRegistered)
  );
};
