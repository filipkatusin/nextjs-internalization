interface Props {
  children: any;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return <div className={`container mx-auto ${className}`}>{children}</div>;
}
