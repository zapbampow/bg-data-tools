import { Container } from "~/components/pages/layout";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import type { FilterType } from "~/services/queryService/types";
import RecordedPlays from "~/components/answers/RecordedPlays";

type Props = {
  answer: string[] | PlayDataModel[];
  aggregator: FilterType;
};

export default function Answer({ answer, aggregator }: Props) {
  if (!answer || !aggregator) return null;

  console.log("aggregator", aggregator);
  // Recorded play data
  if (aggregator.filter === "listRecordedPlays") {
    return (
      <Container>
        {/* <PlayFilters /> */}
        <RecordedPlays />
      </Container>
    );
  }

  // List of other data
  const orderedProps = answer.sort() as string[];

  return (
    <Container>
      <ul className="p-4 mx-auto border w-max">
        {orderedProps.map((value: string) => {
          return <li key={value}>{value}</li>;
        })}
      </ul>
    </Container>
  );
}
