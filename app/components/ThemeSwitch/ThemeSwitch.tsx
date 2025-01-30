import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useFetcher } from "@remix-run/react";
import { z } from "zod";
import { useTheme } from "~/hooks";

export type Theme = "light" | "dark";
export const fetcherKey = "update-theme";
export const updateThemeActionIntent = "update-theme";

export const ThemeSwitchSchema = z.object({
  theme: z.enum(["light", "dark"]),
});

export default function ThemeSwitch() {
  const fetcher = useFetcher({ key: fetcherKey });
  const userPreference = useTheme();
  const mode = userPreference ?? "light";
  const nextMode = mode === "light" ? "dark" : "light";

  return (
    <fetcher.Form method="POST" action="/">
      <input type="hidden" name="theme" value={nextMode} />
      <button
        type="submit"
        name="intent"
        value={updateThemeActionIntent}
        className="flex items-center text-icon-muted hover:text-icon-hover"
      >
        {mode === "light" ? (
          <>
            <span className="sr-only">Light</span>
            <SunIcon aria-hidden="true" className="size-5" />
          </>
        ) : (
          <>
            <span className="sr-only">Dark</span>
            <MoonIcon aria-hidden="true" className="size-5" />
          </>
        )}
      </button>
    </fetcher.Form>
  );
}
