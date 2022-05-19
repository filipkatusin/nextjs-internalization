interface Props {
  children: any;
  withoutTopMargin?: boolean;
  withoutBottomMargin?: boolean;
  className?: string;
}

export default function Container({
  children,
  withoutTopMargin = false,
  withoutBottomMargin = false,
  className,
}: Props) {
  return (
    <div
      className={
        "container mx-auto " +
        (className ?? "") +
        (withoutTopMargin ? "" : "mt-32 md:mt-0 ") +
        (withoutBottomMargin ? "" : "mb-10")
      }
    >
      {children}
    </div>
  );
}
