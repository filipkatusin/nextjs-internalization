interface Props {
  color?: string;
  className?: string;
}

export default function ArrowIcon({ color, className }: Props) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.58002 16.59L13.17 12L8.58002 7.41L10 6L16 12L10 18L8.58002 16.59Z"
        fill={`${color ?? "white"}`}
      />
    </svg>
  );
}
