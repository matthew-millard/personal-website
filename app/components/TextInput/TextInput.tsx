interface TextInputProps {
  fieldAttributes: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function TextInput({ fieldAttributes }: TextInputProps) {
  return (
    <input
      {...fieldAttributes}
      autoComplete="off"
      className="focus:ring-primary aria-[invalid]:ring-error mt-1 block w-full rounded-sm border-0 bg-transparent px-3 py-1.5 ring-1 ring-edge focus:outline-none"
    />
  );
}
