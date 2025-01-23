export default function Strong({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong {...props} className="text-color-strong font-medium">
      {children}
    </strong>
  );
}
