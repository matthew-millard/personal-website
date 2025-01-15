interface H2Props {
  children: React.ReactNode;
}

export default function H2({ children }: H2Props) {
  return (
    <h2 className="mt-16 text-pretty text-3xl font-semibold tracking-tight text-color">
      {children}
    </h2>
  );
}
