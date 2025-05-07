"use client";

import GlobalChat from "@/components/globalChat";
import Post from "@/components/post";
import PostInput from "@/components/postInput";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<any>(null);
  const [refreshPost, setRefreshPost] = useState(false);
  const { data } = useSession();

  useEffect(() => {
    fetch("/api/social/getallposts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
    setRefreshPost(false);
  }, [refreshPost]);
  return (
    <div className="flex flex-row gap-x-2">
      <div className="basis-2/3 ">
        <div className="rounded-md border-2">
          <PostInput refreshPost={setRefreshPost} />
        </div>
        {posts?.map((post: any) => (
          <div className="rounded-md border-2 mt-4" key={post.id}>
            <Post
              post={{
                id: post.id,
                title: post.title,
                body: post.content,
                authorId: post.authorId,
                createdAt: post.createdAt,
              }}
            />
          </div>
        ))}
      </div>
      <div className="basis-1/3 bg-background h-screen">
        <GlobalChat user={data} />
      </div>
    </div>
  );
}
