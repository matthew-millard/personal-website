import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getAdminId } from "~/.server/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  const adminId = await getAdminId(request);
  if (!adminId) {
    throw redirect("/admin/login");
  }
  return {};
}

export default function AdminRoute() {
  return (
    <div>
      <h1 className="text-4xl text-color">This is the admin panel</h1>
    </div>
  );
}
