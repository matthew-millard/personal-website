import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { isRouteErrorResponse, Link, useRouteError } from "@remix-run/react";
import { H1, H2, P } from "~/components";

interface ErrorLayoutProps {
  status?: number;
  title: string;
  message: string | null;
}

export default function GenericErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorLayout
        status={error.status}
        title={error.statusText}
        message={error.data}
      />
    );
  } else if (error instanceof Error) {
    return <ErrorLayout title={error.name} message={error.message} />;
  } else {
    return <ErrorLayout title="Unknown Error" message={null} />;
  }
}

function ErrorLayout({ status, title, message }: ErrorLayoutProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center space-y-8">
      <H1 additionalClasses="tracking-wide">{status ? status : null}</H1>
      <H2>{title ? title : "Unknown Error"}</H2>
      <P additionalClasses="text-color-muted">
        {message ? message : "Sorry, an unexpected error has occured."}
      </P>

      <Link
        to="/"
        prefetch="intent"
        className="flex items-center gap-x-2 rounded-sm border border-edge-muted px-3 py-2 text-base font-medium leading-relaxed text-color-muted shadow-sm hover:border-edge hover:text-color"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Home
      </Link>
    </main>
  );
}
