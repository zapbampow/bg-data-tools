type Props = {
    width?: number;
    className?: string;
    strokeWidth?: number;
    stroke?: string;
    fill?: string;
};

export default function Play({
    width = 24,
    className = "",
    strokeWidth = 2,
    stroke = "currentColor",
    fill = "none"
}: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={width}
            viewBox="0 0 24 24"
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-player-play ${className}`}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 4v16l13 -8z" />
        </svg>
    )
}
