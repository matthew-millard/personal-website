interface UnorderedListProps {
  children: React.ReactNode;
}

export default function UnorderedList({ children }: UnorderedListProps) {
  return (
    <ul className="text-primary mt-8 max-w-xl list-outside list-disc space-y-8 pl-5">
      {children}
    </ul>
  );
}
