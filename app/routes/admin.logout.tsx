import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { requireAdminId } from "~/.server/auth";
import { sessionKey } from "~/.server/config";
import { prisma } from "~/.server/db";
import { sessionStorage } from "~/.server/session";

export async function loader() {
  return redirect("/admin");
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAdminId(request);
  const cookieSession = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  const sessionId = cookieSession.get(sessionKey);

  if (sessionId) {
    void (await prisma.session.delete({
      where: {
        id: sessionId,
      },
    }));
  }

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(cookieSession),
    },
  });
}
