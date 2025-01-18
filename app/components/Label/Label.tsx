interface LabelProps {
  children: React.ReactNode;
  fieldAttributes: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export default function Label({ children, fieldAttributes }: LabelProps) {
  return (
    <label {...fieldAttributes} className="text-color-muted">
      {children}
    </label>
  );
}
