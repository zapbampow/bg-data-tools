import { PlayFilterProvider } from "~/contexts/playFilterContext";
import { PlayResultsProvider } from "~/contexts/playResultsContext";
import "~/styles/bggStats/datePickerStyles.css";
import PlaysDashboard from "~/components/pages/PlaysDashboard";

export function Component() {
  return (
    <PlayFilterProvider>
      <PlayResultsProvider>
        <PlaysDashboard />
      </PlayResultsProvider>
    </PlayFilterProvider>
  );
}
