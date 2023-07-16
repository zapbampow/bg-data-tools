import React from "react";

type State = {
  year: number | null;
  month: number | null;
  days: number[];
  filterOrder: number | null;
};

type PlayCountCardProviderProps = { children: React.ReactNode };
type Action = {
  type: "setYear" | "setMonth" | "setDays" | "setFilterOrder";
  payload: any;
};
type Dispatch = (action: Action) => void;

const initialState: State = {
  year: null,
  month: null,
  days: [],
  filterOrder: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setYear":
      return { ...state, year: action.payload };
    case "setMonth":
      return { ...state, month: action.payload };
    case "setDays":
      return { ...state, days: action.payload };
    case "setFilterOrder":
      return { ...state, filterOrder: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const PlayCountCardContext = React.createContext<
  | {
      state: State;
      dispatch: Dispatch;
      setYear: (year: number | null) => void;
      setMonth: (month: number | null) => void;
      setDays: (days: number[]) => void;
      setFilterOrder: (filterOrder: number | null) => void;
    }
  | undefined
>(undefined);

const PlayCountCardProvider = ({ children }: PlayCountCardProviderProps) => {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  const setYear = (year: number | null) => {
    dispatch({ type: "setYear", payload: year });
  };

  const setMonth = (month: number | null) => {
    dispatch({ type: "setMonth", payload: month });
  };

  const setDays = (days: number[]) => {
    dispatch({ type: "setDays", payload: days });
  };

  const setFilterOrder = (filterOrder: number | null) => {
    dispatch({ type: "setFilterOrder", payload: filterOrder });
  };

  const value = {
    state,
    dispatch,
    setYear,
    setMonth,
    setDays,
    setFilterOrder,
  };

  return (
    <PlayCountCardContext.Provider value={value}>
      {children}
    </PlayCountCardContext.Provider>
  );
};

function usePlayCountCardContext() {
  const context = React.useContext(PlayCountCardContext);
  if (context === undefined) {
    throw new Error(
      `usePlayCountCardContext must be used within a PlayCountCardProvider`
    );
  }
  return context;
}

export { PlayCountCardProvider, usePlayCountCardContext };
