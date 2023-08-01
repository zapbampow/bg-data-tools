type DataSet = {
  label: string;
  data: number[];
  backgroundColor?: string[];
};

export type Data = {
  labels: string[];
  datasets: DataSet[];
};

export type Screen = "year" | "months" | "month";

interface Month {
  monthNum: number;
  month: string;
  count: number;
  dates:
    | string[]
    | {
        day: string;
        count: number;
      }[];
}

export interface DateGroup {
  year: string;
  count: number;
  months: Month[];
}

export interface PlayCountDateGroup {
  year: string;
  count: number;
  months: Month[];
}
