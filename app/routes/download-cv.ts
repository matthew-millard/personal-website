export async function loader() {
  const cvUrl =
    "https://res.cloudinary.com/hospohub/image/upload/v1761833724/matthew_millard_resume_2025_wub2nh.pdf";
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
