import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SelectProps {
  children: React.ReactNode;
  fieldAttributes: React.SelectHTMLAttributes<HTMLSelectElement>;
}

export default function Select({ children, fieldAttributes }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...fieldAttributes}
        className="focus:ring-primary aria-[invalid]:ring-error mt-1 block w-full appearance-none rounded-sm border-0 bg-transparent px-3 py-1.5 ring-1 ring-edge focus:outline-none"
      >
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-edge" />
    </div>
  );
}
