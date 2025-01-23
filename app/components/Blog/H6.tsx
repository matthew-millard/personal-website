export default function H6({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h6">) {
  return (
    <h6
      {...props}
      className="mt-3 text-pretty text-lg font-medium leading-relaxed text-color"
    >
      {children}
    </h6>
  );
}
