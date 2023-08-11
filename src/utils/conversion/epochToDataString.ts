import dayjs from "dayjs";

export default function epochToDateString(seconds: number) {
  const date = dayjs.unix(seconds);
  return date.format("YYYY-MM-DD");
}
