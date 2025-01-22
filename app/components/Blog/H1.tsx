export default function H1({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      {...props}
      className="mt-10 text-pretty text-5xl leading-tight text-color"
    >
      {children}
    </h1>
  );
}
