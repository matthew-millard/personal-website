interface FigCaptionProps {
  children: React.ReactNode;
}

export default function FigCaption({ children }: FigCaptionProps) {
  return (
    <figcaption className="mt-2 text-sm/6 text-color-subtle">
      {children}
    </figcaption>
  );
}
