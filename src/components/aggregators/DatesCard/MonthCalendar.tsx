import type { DateGroup } from "../types";
import getPlayDatesFromMonthData from "./utils/getPlayDatesFromMonthData";
import Calendar from "react-calendar/dist/cjs";
import dayjs from "dayjs";
import monthNum from "./utils/monthNum";
import { useCalendarScreenContext } from "../CalendarScreenContext";

type Props = {
  data: DateGroup[];
};

export default function MonthCalendar({ data }: Props) {
  const {
    state: { year, month },
  } = useCalendarScreenContext();

  const dates = getPlayDatesFromMonthData({
    data: data[0],
    year,
    month,
  }) as string[];

  if (!year || !month) return null;

  return (
    <div className="w-full">
      <Calendar
        className="dashboard_month_calendar"
        value={
          new Date(year, parseInt(monthNum[month as keyof typeof monthNum]) - 1)
        }
        tileClassName={({ date, view }) => {
          let dateStr = dayjs(date).format("YYYY-MM-DD");
          if (dates?.includes(dateStr)) {
            return "recorded-play-date";
          }
        }}
        showNavigation={false}
        formatShortWeekday={(locale, date) =>
          dayjs(date).format("dd").slice(0, 1)
        }
        calendarType="gregory"
        onClickDay={(value) => console.log(value)}
      />
    </div>
  );
}
