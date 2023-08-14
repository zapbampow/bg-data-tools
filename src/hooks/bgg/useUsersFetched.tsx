import { useSessionStorage } from "../useSessionStorage.tsx";

export default function useUsersFetched() {
  const [fetchedUsers, setFetchedUsers] = useSessionStorage(
    "fetchedUsers",
    []
  ) as [string[], (value: string[]) => void];

  const addFetchedUser = (username: string) => {
    if (!username) return;

    const exists = isUserFetched(username);
    if (exists) return;

    setFetchedUsers([...fetchedUsers, username]);
  };
  const removeFetchedUser = (username: string) => {
    setFetchedUsers(fetchedUsers.filter((user) => user !== username));
  };
  const isUserFetched = (username: string | undefined): boolean => {
    if (!fetchedUsers) return false;
    if (!username) return true;
    return fetchedUsers?.includes(username);
  };

  return {
    addFetchedUser,
    removeFetchedUser,
    isUserFetched,
    fetchedUsers,
  };
}
