export async function loader() {
  const cvUrl =
    "https://res.cloudinary.com/hospohub/image/upload/v1738086008/Matt_Millard_Resume_yc6qbo.pdf";
  const response = await fetch(cvUrl);

  if (!response.ok) {
    throw new Response("Failed to fetch CV", { status: response.status });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Matt_Millard_CV.pdf"`,
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
    status: response.status,
    statusText: response.statusText,
  });
}
