import { useState, useEffect } from "react";
import { getUsers, deleteUserAndPlaysByUserId } from "~/services/idbService";
import { UserInfo } from "~/models/bgg/userInfo";

export default function useManageData() {
  const [users, setUsers] = useState<UserInfo[]>();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<number>();

  const deleteUserData = async (id: number) => {
    setProcessing(id);
    try {
      const deleted = await deleteUserAndPlaysByUserId(id);

      const updatedUsers = users?.filter((user) => user.userId !== id);

      setUsers(updatedUsers);
      setProcessing(undefined);
      return `Deleted ${deleted.playsDeleted} plays`;
    } catch (err: any) {
      setError(err);
      setProcessing(undefined);
      // @ts-ignore
      throw new Error(err);
    }
  };

  useEffect(function getAndSetUsers() {
    getUsers()
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return { users, deleteUserData, error, processing, setError };
}
