interface SubmitButtonProps {
  children?: React.ReactNode;
  buttonAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export default function SubmitButton({
  children,
  buttonAttributes,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      {...buttonAttributes}
      className="rounded-sm border border-edge-muted px-3 py-2 text-sm font-semibold text-color-muted shadow-sm hover:border-edge hover:text-color"
    >
      {children}
    </button>
  );
}
