import { Outlet } from "@remix-run/react";
import { Footer, Header } from "~/components";

export default function AboutLayout() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-4xl flex-col px-6">
      <Header />
      <main className="flex flex-grow flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
