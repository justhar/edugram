"use client";

import { useSession } from "@/lib/auth-client";
import { FileImage } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CommentInput({
  refreshComment,
  postId,
}: {
  refreshComment: any;
  postId: string;
}) {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handlePostSubmit = () => {
    setLoading(true);
    fetch("/api/social/postcomment", {
      method: "POST",
      body: JSON.stringify({
        postId: postId,
        body: body,
        mail: session?.user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          setLoading(false);
          return;
        }
        toast.success("Comment posted successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });

    setBody("");
    setLoading(false);
    refreshComment((prev: any) => !prev);
  };

  return (
    <div className="border-2 text-white px-3 py-2 rounded-lg ">
      <textarea
        className="w-full text-white rounded-md resize-none focus:outline-none"
        rows={3}
        placeholder="share what you love"
        value={body}
        onChange={(e) => setBody(e.target.value)}
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
          className="text-background px-2 text-sm rounded-md bg-foreground hover:bg-foreground/80 transition-colors duration-200 cursor-pointer"
          onClick={handlePostSubmit}
          disabled={loading}
        >
          Comment
        </button>
      </div>
    </div>
  );
}
