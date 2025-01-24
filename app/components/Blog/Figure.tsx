interface FigureProps {
  children: React.ReactNode;
}

export default function Figure({ children }: FigureProps) {
  return <figure className="my-12">{children}</figure>;
}
