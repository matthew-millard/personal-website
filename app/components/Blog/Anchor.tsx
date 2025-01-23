export default function Anchor({
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-500"
      {...props}
    >
      {children}
    </a>
  );
}
