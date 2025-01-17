import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
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
      <Form method="POST" action="/admin/logout">
        <button type="submit" className="text-link">
          Log out
        </button>
      </Form>
      {/* Create a link to /admin/new-blog-post */}
      <Link to="/admin/blog/new" className="text-link">
        Create new blog post
      </Link>
    </div>
  );
}
