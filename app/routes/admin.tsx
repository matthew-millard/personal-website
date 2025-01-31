import { Outlet } from "@remix-run/react";
import { Footer, Header } from "~/components";

export default function AdminLayout() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-4xl flex-col px-6">
      <Header />
      <main className="flex-grow py-24 sm:py-32">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
