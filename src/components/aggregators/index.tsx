import { AggregatorProvider } from "./AggregatorContext";
import AggregatorRow from "./AggregatorRow.tsx";

type Props = {
  userId: number;
};

export default function index({ userId }: Props) {
  return (
    <AggregatorProvider>
      <AggregatorRow userId={userId} />
    </AggregatorProvider>
  );
}
