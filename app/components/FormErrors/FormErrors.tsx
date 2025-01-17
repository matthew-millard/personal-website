import { FormMetadata } from "@conform-to/react";

type FormErrorsProps = Pick<FormMetadata, "errorId" | "errors">;

export default function FormErrors({ errorId, errors }: FormErrorsProps) {
  return (
    <div id={errorId} className="text-error mt-1 text-xs">
      {errors ? (
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : (
        <p>&nbsp;</p>
      )}
    </div>
  );
}
