import { Container } from "../pages/layout";
import LocationsCard from "./LocationsCard";
import PlayersCard from "./PlayersCard";
import RecordedPlaysCard from "./RecordedPlaysCard";
import DatesCard from "./DatesCard";
import AggregatorMenu from "./AggregatorMenu/AggregatorMenu";
import PlayCountCard from "./PlayCountCard";
import { CalendarScreenProvider } from "./CalendarScreenContext";
import { useAggregatorContext } from "./AggregatorContext.tsx";

type Props = {
  userId: number;
};

export default function AggregatorRow({ userId }: Props) {
  const { settings, setSettings } = useAggregatorContext();

  return (
    <CalendarScreenProvider>
      <div className="grid gap-2">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {getAggregators(settings, userId)}
          </div>
        </Container>

        <Container className="mb-8">
          <AggregatorMenu settings={settings} setSettings={setSettings} />
        </Container>
      </div>
    </CalendarScreenProvider>
  );
}

const getAggregators = (settings: string[], userId: number) => {
  // console.log({ settings });

  return settings.map((setting: string) => {
    switch (setting) {
      case "daysPlayed":
        return <DatesCard key={setting} userId={userId} />;
      case "players":
        return <PlayersCard key={setting} />;
      case "locations":
        return <LocationsCard key={setting} />;
      case "recordedPlays":
        return <RecordedPlaysCard key={setting} />;
      case "playCount":
        return <PlayCountCard key={setting} userId={userId} />;
      default:
        return null;
    }
  });
};
