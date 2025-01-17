import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getAdminId } from "~/.server/auth";
import { SubmitButton } from "~/components";

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
      <Form method="POST" action="/admin/logout">
        <SubmitButton>Log out</SubmitButton>
      </Form>
    </div>
  );
}
