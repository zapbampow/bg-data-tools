import React from "react";
import { useLocalStorage } from "~/hooks/useLocalStorage.tsx";

export type Setting =
  | "daysPlayed"
  | "players"
  | "locations"
  | "recordedPlays"
  | "playCount";

type AggregatorProviderProps = { children: React.ReactNode };

const AggregatorContext = React.createContext<
  | {
    settings: Setting[];
    setSettings: (settings: Setting[]) => void;
  }
  | undefined
>(undefined);

const AggregatorProvider = ({ children }: AggregatorProviderProps) => {
  const [settings, setSettings] = useLocalStorage("aggregators", [
    // "playCount",
    // "recordedPlays",
    // "daysPlayed",
    // "players",
  ]);

  const value = {
    settings,
    setSettings,
  };

  return (
    <AggregatorContext.Provider value={value}>
      {children}
    </AggregatorContext.Provider>
  );
};

type AggregatorContextType = React.ContextType<typeof AggregatorContext>;

function useAggregatorContext() {
  const context = React.useContext(AggregatorContext);
  if (context === undefined) {
    throw new Error(
      `useAggregatorContext must be used within a AggregatorProvider`
    );
  }
  return context;
}

export { AggregatorProvider, useAggregatorContext };
export type { AggregatorContextType };
