import { Prisma } from "@prisma/client";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getAdminId } from "~/.server/auth";
import { prisma } from "~/.server/db";

export async function action({ request, params }: ActionFunctionArgs) {
  const adminId = await getAdminId(request);
  if (!adminId) {
    throw redirect("/admin/login");
  }
  const { postId } = params;

  try {
    await prisma.blogPost.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    // Check if the error is a known Prisma error indicating a missing record
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      // The blog post doesn't exist; return a 404 response.
      throw new Response(`Blog post not found for post id: ${postId}`, {
        status: 404,
        statusText: "Not Found",
      });
    }

    // Something else went wrong during deletion (e.g., a DB error)
    console.error("Error deleting blog post:", error);
    throw new Response(`Failed to delete blog post for post id: ${postId}`, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }

  // Return a 204 No Content status on successful deletion.
  return new Response(null, { status: 204 });
}

export async function loader() {
  throw redirect("/admin");
}
