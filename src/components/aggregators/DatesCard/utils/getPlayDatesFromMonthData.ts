import type { Data, DateGroup, PlayCountDateGroup } from "../../types";

type Args = {
  data: DateGroup | PlayCountDateGroup;
  year: number | null;
  month: number | string | null;
};

export default function getPlayDatesFromMonthData({ data, year, month }: Args) {
  console.log("data", data);
  if (!data || !year || !month) return null;
  const selectedMonth = data.months.find((m) => m.month === month);
  return selectedMonth?.dates;
}
