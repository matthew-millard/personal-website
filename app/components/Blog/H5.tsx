export default function H5({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h5">) {
  return (
    <h5
      {...props}
      className="mt-4 text-pretty text-xl font-medium leading-normal text-color"
    >
      {children}
    </h5>
  );
}
