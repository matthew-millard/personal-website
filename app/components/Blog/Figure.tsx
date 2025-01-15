interface FigureProps {
  children: React.ReactNode;
}

export default function Figure({ children }: FigureProps) {
  return <figure className="mt-16">{children}</figure>;
}
