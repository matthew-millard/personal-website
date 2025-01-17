interface LabelProps {
  children: React.ReactNode;
  fieldAttributes: React.HTMLAttributes<HTMLLabelElement>;
}

export default function Label({ children, fieldAttributes }: LabelProps) {
  return (
    <label {...fieldAttributes} className="text-color-muted">
      {children}
    </label>
  );
}
