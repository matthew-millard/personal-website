import { ENV } from "~/env";

export async function loader() {
  const baseUrl = ENV.BASE_URL;

  if (!baseUrl) {
    console.error("BASE_URL is not defined");
    return new Response("Internal server error", { status: 500 });
  }

  const robotText = `
        User-agent: Googlebot
        Disallow: /nogooglebot/
        User-agent: *
        Allow: /
        Sitemap: https://${baseUrl}/sitemap.xml`;
  return new Response(robotText, {
    headers: {
      "Content-Type": "text/plain",
    },
    status: 200,
  });
}
