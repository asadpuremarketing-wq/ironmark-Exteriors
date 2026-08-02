type Props = {
  from: string;
  to: string;
  height?: string;
};

export default function SectionFade({ from, to, height = "3.5rem" }: Props) {
  return (
    <div
      aria-hidden="true"
      style={{
        height,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
    />
  );
}
