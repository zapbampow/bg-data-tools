import { useRef } from "react";
import type { MouseEvent, RefObject } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import type { Data, DateGroup } from "../../types";
import getMonthsChartDataByYear from "../../DatesCard/utils/getMonthsChartDataByYear";
import { usePlayFilterContext } from "~/contexts/playFilterContext";
import monthNum from "../../DatesCard/utils/monthNum";
import dayjs from "dayjs";
import { useCalendarScreenContext } from "../../CalendarScreenContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y" as const,
  updateMode: "show",
  responsive: true,
  // maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Months",
    },
  },
};

const getDataFromEvent = (
  e: MouseEvent<HTMLCanvasElement>,
  chartRef: RefObject<Chart>,
  data: Data
) => {
  if (!chartRef?.current) return;
  const el = getElementAtEvent(chartRef?.current, e);

  if (!el.length) return;
  const { index } = el[0];
  const dataFromEvent = data?.labels[index];

  return dataFromEvent;
};

type Props = {
  data: DateGroup[];
};
export default function MonthsChart({ data }: Props) {
  const { state: filterState, dispatch } = usePlayFilterContext();

  const {
    state: { year },
    setMonth,
    setScreen,
  } = useCalendarScreenContext();
  const chartRef = useRef<Chart<"bar">>(null);

  const monthsData = getMonthsChartDataByYear(data);

  const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const month: string | undefined = getDataFromEvent(e, chartRef, monthsData);
    if (!month) return;

    setMonth(month);
    setScreen("month");

    const dateFilterIndex = filterState.findIndex(
      (item) => item.filter === "betweenDates"
    );
    const order = dateFilterIndex !== -1 ? dateFilterIndex : filterState.length;

    const monthValue = monthNum[month as keyof typeof monthNum];
    const endOfMonth = dayjs(`${year}-${monthValue}-01`).endOf("month").date();
    const startDate = `${year}-${monthValue}-01`;
    const endDate = `${year}-${monthValue}-${endOfMonth}`;

    dispatch({
      type: "upsert",
      filter: {
        order,
        filter: "betweenDates",
        label: "Between",
        arg: [startDate, endDate],
      },
    });

    // setScreen("months");
    // setMonth(month)
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!chartRef?.current) return;
    const label = getDataFromEvent(e, chartRef, monthsData);

    if (!label) {
      chartRef.current.canvas.style.cursor = "default";
    } else {
      chartRef.current.canvas.style.cursor = "pointer";
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {/* months chart */}
      <Bar
        ref={chartRef}
        data={monthsData}
        options={options}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
}
