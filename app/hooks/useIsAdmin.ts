import { useRouteLoaderData } from "@remix-run/react";
import { loader } from "~/root";

export default function useIsAdmin() {
  const data = useRouteLoaderData<typeof loader>("root");
  return data?.admin ?? false;
}
