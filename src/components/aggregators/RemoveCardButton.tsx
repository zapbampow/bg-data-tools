import { useEffect } from "react";
import Minus from "../icons/Minus";
import { useAggregatorContext } from "./AggregatorContext.tsx";

type Props = {
  card: "daysPlayed" | "players" | "recordedPlays" | "playCount" | "locations";
};

export default function RemoveCardButton({ card }: Props) {
  const { settings, setSettings } = useAggregatorContext();

  useEffect(() => {
    console.log("settings in btn", settings);
  }, [settings]);

  const removeCard = () => {
    // console.log(card);
    // console.log("settings", settings);
    const newSettings = settings.filter((setting: string) => setting !== card);
    // console.log("newSettings", newSettings);
    setSettings(newSettings);
  };

  return (
    <button onClick={removeCard} className="absolute top-4 right-2">
      <Minus stroke="hsl(0 0% 0% / .5)" />
    </button>
  );
}
