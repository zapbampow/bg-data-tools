import type { ReactElement } from "react";

type Props = {
  width?: number;
  className?: string;
  strokeWidth?: number;
};

export default function CheckIcon({
  width = 24,
  className,
  strokeWidth = 2,
}: Props): ReactElement<any, any> {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} icon icon-tabler icon-tabler-check`}
      width={width}
      height={width}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M5 12l5 5l10 -10"></path>
    </svg>
  );
}
