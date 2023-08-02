import { useCallback, useEffect, useState } from "react";
import { usePlayResultsContext } from "~/contexts/playResultsContext";
import { Card, CardTitle } from "./Card";
import RemoveCardButton from "./RemoveCardButton.tsx";

export default function RecordedPlaysCard() {
  const { state } = usePlayResultsContext();
  const [count, setCount] = useState(0);

  const getCount = useCallback(async () => {
    try {
      const countFromRes = state.reduce((acc, cur) => {
        if (!cur.quantity) return acc + 1;
        return acc + cur.quantity;
      }, 0);
      setCount(countFromRes);
    } catch (err) {
      console.error(err);
    }
  }, [state]);

  useEffect(() => {
    // get most recent plays
    getCount();
    // set state
  }, [getCount]);

  return (
    <Card>
      <CardTitle>Total Plays</CardTitle>
      <RemoveCardButton card="recordedPlays" />

      <div className="flex items-center justify-center text-4xl font-semibold grow">
        {count.toLocaleString("en-US")}
      </div>
    </Card>
  );
}
