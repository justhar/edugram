"use client";

import { useSession } from "@/lib/auth-client";
import { postPost } from "@/lib/db";
import { FileImage } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function PostInput({ refreshPost }: { refreshPost: any }) {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handlePostSubmit = () => {
    setLoading(true);
    fetch("/api/social/postpost", {
      method: "POST",
      body: JSON.stringify({
        title: postTitle,
        content: postBody,
        authorId: session?.user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          setLoading(false);
          return;
        }
        toast.success("Post created successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });

    setPostTitle("");
    setPostBody("");
    setLoading(false);
    refreshPost((prev: any) => !prev);
  };

  return (
    <div className=" text-white px-3 py-2 rounded-lg ">
      <textarea
        className="w-full h-full text-xl text-white font-bold rounded-md resize-none focus:outline-none "
        rows={1}
        placeholder="whats on your mind?"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <textarea
        className="w-full text-white rounded-md resize-none focus:outline-none"
        rows={3}
        placeholder="share what you love"
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
      />
      <div className="flex justify-between mt-2">
        <button
          className=" text-foreground py-2 rounded-md mr-2"
          onClick={() =>
            toast("fiturnya blm dibikin, nunggu yang make banyak dl")
          }
        >
          <FileImage />
        </button>
        <button
          className="text-background px-4 py-2 rounded-md bg-foreground hover:bg-foreground/80 transition-colors duration-200 cursor-pointer"
          onClick={handlePostSubmit}
          disabled={loading}
        >
          Share
        </button>
      </div>
    </div>
  );
}
