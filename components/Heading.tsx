import Container from "@/components/Container";

export default function Heading({ label }) {
  return (
    <Container
      className={
        "flex items-center border-b border-gray-footer py-8 md:py-16 mb-6 md:mb-12"
      }
    >
      <h1>{label}</h1>
    </Container>
  );
}
