import PostDetail from "@/components/postDetail";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PostDetail postId={id} />;
}
