export default function OrderedList({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"ol">) {
  return (
    <ol {...props} className="list-decimal pl-5 text-color">
      {children}
    </ol>
  );
}
