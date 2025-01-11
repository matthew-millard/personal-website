import { isRouteErrorResponse, Link, useRouteError } from "@remix-run/react";

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
    <main className="text-color grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-semibold">{status ? status : null}</p>
        <h1 className="mt-4 text-4xl font-semibold">
          {title ? title : "Unknown Error"}
        </h1>
        <p className="mt-6 text-lg leading-7">
          {message ? message : "Sorry, an unexpected error has occured."}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/" prefetch="intent">
            <span>← Go back home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
