import * as React from "react";
import { User } from "~/hooks/bgg/useManageData.tsx";

type UserProviderProps = { children: React.ReactNode };
type Action =
  | {
      type: "setUser";
      payload: User;
    }
  | {
      type: "setLoading";
      payload: boolean;
    }
  | {
      type: "setError";
      payload: string | undefined;
    };
type Dispatch = (action: Action) => void;

type State = {
  user: User | undefined;
  error: string | undefined;
  loading: boolean | undefined;
};

const UserContext = React.createContext<
  | {
      state: State;
      dispatch: Dispatch;
    }
  | undefined
>(undefined);

const defaultState: State = {
  user: undefined,
  error: undefined,
  loading: undefined,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.payload,
      };
    case "setLoading":
      return {
        ...state,
        loading: action.payload,
      };
    case "setError":
      return {
        ...state,
        error: action.payload,
      };
    default:
      // @ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(
    reducer,
    defaultState
  );

  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserContext };
