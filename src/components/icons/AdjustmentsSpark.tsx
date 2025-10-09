type Props = {
    width?: number;
    className?: string;
    strokeWidth?: number;
};

export default function AdjustmentsSpark({
    width = 24,
    strokeWidth = 2,
    className = "",
}: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={width}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-adjustments-spark ${className}`}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M6 4v4" /><path d="M6 12v8" />
            <path d="M13.879 15.312a2 2 0 1 0 -2.26 2.652" />
            <path d="M12 4v10" />
            <path d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M18 4v1" />
            <path d="M18 9v2.5" />
            <path d="M19 22.5a4.75 4.75 0 0 1 3.5 -3.5a4.75 4.75 0 0 1 -3.5 -3.5a4.75 4.75 0 0 1 -3.5 3.5a4.75 4.75 0 0 1 3.5 3.5" />
        </svg>
    );
}



