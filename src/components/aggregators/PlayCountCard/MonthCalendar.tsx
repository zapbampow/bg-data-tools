import type { DateGroup } from "../types";
import getPlayDatesFromMonthData from "../DatesCard/utils/getPlayDatesFromMonthData";
import Calendar from "react-calendar/dist/cjs";
import dayjs from "dayjs";
import monthNum from "../DatesCard/utils/monthNum";
import { useCalendarScreenContext } from "../CalendarScreenContext";
import DayInfo from "./DayInfo";

type Props = {
  data: DateGroup[];
};

export default function MonthCalendar({ data }: Props) {
  const {
    state: { year, month },
  } = useCalendarScreenContext();
  const dates = getPlayDatesFromMonthData({ data: data[0], year, month }) as {
    day: string;
    count: number;
  }[];

  if (!year) return null;

  return (
    <div className="w-full">
      <Calendar
        className="dashboard_month_calendar"
        value={
          new Date(year, parseInt(monthNum[month as keyof typeof monthNum]) - 1)
        }
        tileClassName={({ date, view }) => {
          let dateStr = dayjs(date).format("YYYY-MM-DD");
          if (dates?.some((d) => d.day === dateStr)) {
            return "recorded-play-date";
          }
        }}
        showNavigation={false}
        formatShortWeekday={(locale, date) =>
          dayjs(date).format("dd").slice(0, 1)
        }
        calendarType="gregory"
        onClickDay={(value, e) => {
          // let day = dayjs(value).format("YYYY-MM-DD");
          // let dateCount = dates.find((d) => d.day === day);
        }}
        tileContent={({ date, view }) => (
          <DayInfo date={date} view={view} dates={dates} />
        )}
      />
    </div>
  );
}
