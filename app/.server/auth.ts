import { prisma } from "./db";
import { redirect } from "@remix-run/node";
import { getSession, sessionStorage } from "./session";
import { sessionKey } from "./config";
import type { Password, Admin } from "@prisma/client";
import bcrypt from "bcryptjs";

// Cookie Expiration Time
const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days

export function getSessionExpirationDate() {
  const expirationDate = new Date(Date.now() + SESSION_EXPIRATION_TIME);
  return expirationDate;
}

export async function getAdminId(request: Request) {
  const cookieSession = await getSession(request);
  const sessionId = cookieSession.get(sessionKey);

  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    select: { adminId: true },
  });

  if (!session) {
    throw await logoutAdmin({ request });
  }

  return session.adminId;
}

export async function redirectIfAdminLoggedIn(request: Request) {
  const adminId = await getAdminId(request);
  if (adminId) {
    throw redirect(`/admin`);
  }
}

export async function requireAdminId(request: Request) {
  const adminId = await getAdminId(request);

  if (!adminId) {
    throw redirect("/admin/login");
  }

  return adminId;
}

export async function logoutAdmin(
  {
    request,
  }: {
    request: Request;
  },
  responseInit?: ResponseInit,
) {
  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  const sessionId = cookieSession.get(sessionKey);
  void prisma.session.delete({ where: { id: sessionId } }).catch(() => {});

  throw redirect("/admin/login", {
    headers: {
      "set-cookie": await sessionStorage.destroySession(cookieSession),
    },
  });
}

export async function loginAdmin({
  email,
  password,
}: {
  email: Admin["email"];
  password: Password["hash"];
}) {
  const admin = await verifyAdminPassword({ email }, password);

  if (!admin) return null;

  const session = await prisma.session.create({
    data: {
      adminId: admin.id,
      expirationDate: getSessionExpirationDate(),
    },
    select: { id: true, expirationDate: true, adminId: true },
  });

  return session;
}

export async function verifyAdminPassword(
  where: Pick<Admin, "email"> | Pick<Admin, "id">,
  password: Password["hash"],
) {
  const adminWithPassword = await prisma.admin.findUnique({
    where,
    select: { id: true, password: { select: { hash: true } } },
  });

  if (!adminWithPassword || !adminWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    adminWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  return { id: adminWithPassword.id };
}
