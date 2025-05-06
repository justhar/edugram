import { getUserProfile } from "@/lib/db";
import { redirect } from "next/navigation";
import ProfileClient from "@/components/profile";

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  return <ProfileClient id={id} />;
}
