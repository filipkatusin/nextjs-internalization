import Container from "@/components/Container";

export default function Heading({ label }) {
  return (
    <h1
      style={{ backgroundColor: "rgba(98,89,89,0.15)" }}
      className="py-10 md:py-20 mb-10"
    >
      <Container>{label}</Container>
    </h1>
  );
}
