import { useCallback } from "react";
import { useUserContext } from "./userContext.tsx";
import type { User } from "~/hooks/bgg/useManageData.tsx";

const useUser = () => {
  const { state, dispatch } = useUserContext();
  const { user } = state;
  const setUser = useCallback((user: User) => {
    dispatch({ type: "setUser", payload: user });
  }, []);

  return { user, setUser };
};

const useLoading = () => {
  const { state, dispatch } = useUserContext();
  const { loading } = state;
  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: "setLoading", payload: loading });
  }, []);

  return { loading, setLoading };
};

const useError = () => {
  const { state, dispatch } = useUserContext();
  const { error } = state;
  const setError = useCallback((error: string | undefined) => {
    dispatch({ type: "setError", payload: error });
  }, []);

  return { error, setError };
};

export { useUser, useLoading, useError };
