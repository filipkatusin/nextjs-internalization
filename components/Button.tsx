interface Props {
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  label: string;
  padding?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event) => void;
  border?: string;
}

export default function Button({
  label,
  type,
  onClick,
  className,
  backgroundColor,
  textColor,
  padding,
  border,
}) {
  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        color: textColor ?? "#FFFFFF",
        border: border,
      }}
      className={`lg:self-start my-5 ${
        padding ?? "px-4 py-2"
      } font-medium rounded-md uppercase bg-red-600 hover:bg-red-700 inline ${className}`}
      type={type ?? "submit"}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
