import { createCookieSessionStorage } from "@remix-run/node";
import { cookiePrefix } from "./config";
import { ENV } from "~/env";

const sessionSecret = ENV.SESSION_SECRET;

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: `${cookiePrefix}_admin_session_id`,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getCookie(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
