export default function H3({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h3">) {
  return (
    <h1
      {...props}
      className="mt-10 text-pretty text-3xl leading-snug text-color"
    >
      {children}
    </h1>
  );
}
