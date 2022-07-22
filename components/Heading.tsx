import Container from "@/components/Container";

interface Props {
  label: string;
  className?: string;
  center?: boolean;
}

export default function Heading({ label, className, center }: Props) {
  return (
    <Container
      className={`flex items-center border-b border-gray-footer py-8 md:py-16 mb-6 md:mb-12 ${
        center ? "justify-center" : ""
      }`}
    >
      <h1 className={className}>{label}</h1>
    </Container>
  );
}
