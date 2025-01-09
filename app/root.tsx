import { cssBundleHref } from "@remix-run/css-bundle";
import {
  ActionFunctionArgs,
  json,
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
import stylesheet from "~/tailwind.css";
import { getThemeFromCookie, updateTheme } from "./.server/theme";
import { type Theme } from "./components/ThemeSwitch";
import { updateThemeActionIntent } from "./components/ThemeSwitch/ThemeSwitch";
import { useTheme } from "./hooks";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  switch (intent) {
    case updateThemeActionIntent:
      return updateTheme(formData);
    default:
      return json(
        { status: "error", message: "Invalid intent" },
        { status: 400 },
      );
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const theme = getThemeFromCookie(request);

  const data = {
    theme: theme as Theme,
  };

  return json(data);
}

export default function App() {
  const theme = useTheme();
  return (
    <html lang="en" className={`${theme} h-full`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-backdrop h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
