"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signOutHandler, useSession } from "@/lib/auth-client";
import { getUserPosts, getUserProfile } from "@/lib/db";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Post from "./post";

export default function ProfileClient({ id }: { id: any }) {
  const { data } = useSession();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any>(null);

  useEffect(() => {
    getUserProfile(id).then((data) => {
      //checks if the data is null or not
      if (!data) {
        redirect("/404");
      }
      setUser(data);
    });

    getUserPosts(id).then((data) => {
      setPosts(data);
    });
  }, [id]);

  function handleSignOut() {
    signOutHandler();
    redirect("/sign");
  }

  if (!user) {
    // Show a loading state while the user data is being fetched
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-white">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row gap-x-2 bg-background">
        <Image
          src="/profile.jpg"
          alt="profile"
          width={100}
          height={100}
          className="mr-2 mt-3 mb-2"
        />
        <div className="flex flex-row my-3 justify-between w-full">
          <div className="flex flex-col">
            <span className="font-bold text-2xl">
              @{user.email.split("@")[0]}
            </span>
            <span className="text-sm text-white">{user.name}</span>
          </div>
          {data?.user?.email === user.email ? (
            <div className="flex flex-col">
              <Button className="text-sm" onClick={handleSignOut}>
                log out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col justify-center">
              <span className="text-sm text-white">follow</span>
              <span className="text-sm text-white">message</span>
            </div>
          )}
        </div>
      </div>
      <div>
        <span className="justify-start font-bold text-xl">posts</span>
        {posts?.map((post: any) => (
          <div className="border-2 rounded-md mt-2" key={post.id}>
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
    </div>
  );
}
