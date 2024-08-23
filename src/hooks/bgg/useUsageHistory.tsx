import dayjs from "dayjs";
import React from "react";
import { useUser } from "~/contexts/userContext/userContextHooks.tsx";
import usageDB from "~/services/usageService";
import { useSessionStorage } from "../useSessionStorage.tsx";
import useStoredUniqueId from "../useStoredUniqueId.tsx";

type PageView = {
  userId: number;
  page: string;
  date: string;
};

export default function useUsageHistory() {
  const { user } = useUser();
  const [pageViews, setPageViews] = useSessionStorage("pageViews", []);
  const [loading, setLoading] = React.useState(false);
  const uniqueId = useStoredUniqueId();

  const addPageView = async (page: string) => {
    if (!user) return;
    if (currentUserHasViewedPageToday(page)) return;
    if (loading) return;

    setLoading(true);

    await usageDB.usageHistory.add(user.userId, user.username, page, uniqueId);

    let today = dayjs().format("YYYY-MM-DD");
    let viewData = { userId: user.userId, page, date: today };
    setPageViews([...pageViews, viewData]);

    setLoading(false);
  };

  const currentUserHasViewedPageToday = (page: string) => {
    if (!user) return false;
    const hasViewed = pageViews.some(
      (pv: PageView) =>
        pv.userId === user.userId &&
        pv.page === page &&
        pv.date === dayjs().format("YYYY-MM-DD")
    );
    return hasViewed;
  };

  return { addPageView, loading };
}
