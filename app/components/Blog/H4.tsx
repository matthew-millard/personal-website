export default function H4({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      {...props}
      className="mt-5 text-pretty text-2xl font-medium leading-normal text-color"
    >
      {children}
    </h4>
  );
}
