import { Outlet } from "@remix-run/react";
import { Footer, Header } from "~/components";

export default function BlogLayout() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-4xl flex-col px-6 lg:px-8">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
