import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { isRouteErrorResponse, Link, useRouteError } from "@remix-run/react";
import { H1, H2, P } from "~/components";

interface GenericErrorBoundaryProps {
  showRedirect?: boolean;
}

interface ErrorLayoutProps {
  status?: number;
  title: string;
  message: string | null;
  showRedirect: boolean;
}

export default function GenericErrorBoundary({
  showRedirect = false,
}: GenericErrorBoundaryProps) {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorLayout
        status={error.status}
        title={error.statusText}
        message={error.data}
        showRedirect={showRedirect}
      />
    );
  } else if (error instanceof Error) {
    return (
      <ErrorLayout
        title={error.name}
        message={error.message}
        showRedirect={showRedirect}
      />
    );
  } else {
    return (
      <ErrorLayout
        title="Unknown error"
        message={null}
        showRedirect={showRedirect}
      />
    );
  }
}

function ErrorLayout({
  status,
  title,
  message,
  showRedirect,
}: ErrorLayoutProps) {
  return (
    <div
      aria-live="assertive"
      className="flex flex-grow flex-col items-center justify-center text-center"
    >
      <H1 additionalClasses="text-error">{status}</H1>
      <H2>{title}</H2>
      <P>{message}</P>
      {showRedirect ? (
        <Link
          className="mt-10 flex items-center gap-x-2 rounded-sm border border-edge-muted px-3 py-2 text-sm font-semibold text-color-muted shadow-sm hover:border-edge hover:text-color"
          to="/"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Home
        </Link>
      ) : null}
    </div>
  );
}
