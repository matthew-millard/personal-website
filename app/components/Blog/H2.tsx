export default function H2({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      {...props}
      className="mt-10 text-pretty text-4xl leading-snug text-color"
    >
      {children}
    </h2>
  );
}
