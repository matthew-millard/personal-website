import FigCaption from "./FigCaption";
import Figure from "./Figure";

interface ImageProps extends React.ComponentPropsWithoutRef<"img"> {
  title?: string;
}

export default function Image({ src, alt, title, ...props }: ImageProps) {
  return (
    <Figure>
      <img
        src={src}
        alt={alt}
        {...props}
        className="aspect-video rounded-sm object-cover"
      />
      {title ? <FigCaption>{title}</FigCaption> : null}
    </Figure>
  );
}
