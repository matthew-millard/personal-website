interface TextAreaInputProps {
  children?: React.ReactNode;
  fieldAttributes: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export default function TextAreaInput({
  children,
  fieldAttributes,
}: TextAreaInputProps) {
  return (
    <textarea
      {...fieldAttributes}
      className="focus:ring-primary aria-[invalid]:ring-error mt-1 block w-full rounded-sm border-0 bg-transparent px-3 py-1.5 ring-1 ring-edge focus:outline-none"
    >
      {children}
    </textarea>
  );
}
