import Times from "../icons/Times";
import { useAggregatorContext } from "./AggregatorContext.tsx";

type Props = {
  card: "daysPlayed" | "players" | "recordedPlays" | "playCount" | "locations";
};

export default function RemoveCardButton({ card }: Props) {
  const { settings, setSettings } = useAggregatorContext();

  const removeCard = () => {
    const newSettings = settings.filter((setting: string) => setting !== card);
    setSettings(newSettings);
  };

  return (
    <button onClick={removeCard} className="absolute top-0 right-0 px-1 py-2">
      <Times stroke="hsl(0 0% 0% / .3)" width={16} />
    </button>
  );
}
