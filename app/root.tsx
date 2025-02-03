import { cssBundleHref } from "@remix-run/css-bundle";
import {
  ActionFunctionArgs,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { type Theme, updateThemeActionIntent } from "~/components/ThemeSwitch";
import stylesheet from "~/tailwind.css";
import { getAdminId } from "./.server/auth";
import { getThemeFromCookie, updateTheme } from "./.server/theme";
import { GenericErrorBoundary } from "./components";
import { useTheme } from "./hooks";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", type: "image/png", href: "/favicon.png" },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  switch (intent) {
    case updateThemeActionIntent:
      return updateTheme(formData);
    default:
      throw new Response("Invalid intent", { status: 400 });
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const theme = getThemeFromCookie(request);
  const admin = await getAdminId(request);

  const data = {
    theme: theme as Theme,
    admin,
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}

function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

function Document({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <html lang="en" className={`${theme} h-full font-sohne`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-backdrop">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  return <App />;
}

export function ErrorBoundary() {
  return (
    <Document>
      <div className="mx-auto flex min-h-dvh max-w-4xl flex-col items-center justify-center px-6">
        <GenericErrorBoundary showRedirect={true} />
      </div>
    </Document>
  );
}
