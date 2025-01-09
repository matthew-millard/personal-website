import * as cookie from "cookie";
import { ThemeSwitchSchema, type Theme } from "~/components/ThemeSwitch";
import { json } from "@remix-run/node";
import { cookiePrefix } from "./config";
import { parseWithZod } from "@conform-to/zod";

const themeKey = "prefers-theme";

export function getThemeFromCookie(request: Request) {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) return "light";

  const theme = cookie.parse(cookieHeader)[`${cookiePrefix}_${themeKey}`];

  return theme === "light" || theme === "dark" ? theme : "dark"; // default to darkmode if user has not set a preference
}

export function setThemeCookie(theme: Theme) {
  const themeCookie = cookie.serialize(`${cookiePrefix}_${themeKey}`, theme, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });

  return themeCookie;
}

export function updateTheme(formData: FormData) {
  const submission = parseWithZod(formData, { schema: ThemeSwitchSchema });

  if (submission.status !== "success") {
    return json(
      submission.reply({
        formErrors: [
          "There was an error updating your theme. Please try again.",
        ],
      }),
    );
  }

  const theme = submission.value.theme;

  const responseInit = {
    headers: {
      "Set-Cookie": setThemeCookie(theme),
    },
  };

  return json({ submission: submission.reply() }, responseInit);
}
