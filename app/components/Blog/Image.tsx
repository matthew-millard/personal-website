export default function Image({
  src,
  alt,
  ...props
}: React.ComponentPropsWithoutRef<"img">) {
  return (
    <img
      src={src}
      alt={alt}
      {...props}
      className="aspect-video rounded-sm object-cover"
    />
  );
}
