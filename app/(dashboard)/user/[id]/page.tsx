import ProfileClient from "@/components/profile";

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProfileClient id={id} />;
}
