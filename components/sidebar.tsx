"use client";

import Link from "next/link";
import { toast } from "sonner";

export default function Sidebar(session: any) {
  return (
    <nav className="w-50 h-screen border-r-2 border-dotted text-white text-3xl font-bold p-4">
      <div className="flex flex-col justify-between h-[50vh]">
        <div className="font-bold text-xl">edugram</div>
        <div className="flex flex-col">
          <Link href="/" className="mb-4 hover:underline">
            home
          </Link>
          <Link
            href={`/user/${session.session?.user?.email}`}
            className="mb-4 hover:underline"
          >
            profile
          </Link>
          <span
            onClick={() => toast("nunggu yang make banyak dulu ok")}
            className="mb-4 hover:underline"
          >
            chat
          </span>
          <span
            onClick={() => toast("nunggu yang make banyak dulu ok")}
            className="hover:underline"
          >
            settings
          </span>
        </div>
      </div>
    </nav>
  );
}
