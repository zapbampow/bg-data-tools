import FilterBar from "../filters/FilterBar";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import usePlayData from "~/hooks/bgg/usePlayData";
import RecordedPlays from "../answers/RecordedPlays";
import Aggregators from "../aggregators";
import DownloadProgress from "../DownloadProgress";
import UsernameForm from "../forms/UsernameForm";
import { Container } from "./layout";
import { ExclamationCircle } from "../icons";
import useUsageHistory from "~/hooks/bgg/useUsageHistory";
import { useEffect } from "react";

export default function PlaysDashboard() {
  const { user, error: userError } = useBggUser();
  const { percentDone, error, userFirstTime, showProgress } = usePlayData();
  const { addPageView, loading } = useUsageHistory();

  useEffect(() => {
    if (loading) return;
    void addPageView(`plays`);
  }, [addPageView, loading]);

  if (!user) return null;

  const titleUserText =
    user?.name && user.name.trim().length > 0 ? user.name : user.username;

  if (userError) {
    return (
      <Container>
        <div className="absolute flex flex-col items-center justify-center gap-8 mt-8 -translate-x-1/2 -translate-y-1/3 top-1/3 left-1/2 w-fit sm:w-max">
          <div className="p-4 text-yellow-700 bg-yellow-100 rounded-md">
            <ExclamationCircle className="inline" />{" "}
            <span className="ml2">{userError}</span>
          </div>
          <UsernameForm />
        </div>
      </Container>
    );
  }

  return (
    <div className="pb-8">
      <DownloadProgress
        percentDone={percentDone}
        error={error}
        userFirstTime={userFirstTime}
        showProgress={showProgress}
      />
      <Container>
        <h1 className="mb-8 text-5xl font-semibold text-white drop-shadow-lg">
          Recorded plays for {titleUserText}
        </h1>
      </Container>
      <FilterBar />
      <Aggregators userId={user.userId} />
      <RecordedPlays />
    </div>
  );
}
