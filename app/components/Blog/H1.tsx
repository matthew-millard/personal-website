export interface H1Props {
  children?: React.ReactNode;
}

export default function H1({ children }: H1Props) {
  return (
    <h1 className="mt-10 text-pretty text-4xl font-semibold tracking-tight text-color sm:text-5xl">
      {children}
    </h1>
  );
}
