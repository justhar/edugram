"use client";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/sidebar";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <Button variant="outline" className="w-full max-w-sm" disabled>
          Loading...
        </Button>
      </div>
    );
  }

  if (!session) {
    redirect("/sign");
  }

  return (
    <div className="flex flex-row">
      <Sidebar session={session} />
      <main className="flex-1 p-4">{children}</main>
      <Toaster />
    </div>
  );
}
