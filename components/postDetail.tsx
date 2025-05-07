"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import CommentInput from "./commentInput";
import Comment from "./comment";
import Link from "next/link";

export default function PostDetail({ postId }: { postId: string }) {
  const [post, setPost] = useState<any>();
  const [refreshComment, setRefreshComment] = useState(false);
  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    fetch("/api/social/getpost?postId=" + postId)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          redirect("/");
        }
        setPost(data);
      });
  }, [postId]);

  useEffect(() => {
    fetch("/api/social/getcomment?postId=" + postId)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
    setRefreshComment(false);
  }, [refreshComment, postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-x-2 bg-background">
        <div className="flex flex-row gap-x-2 bg-background">
          <Image
            src="/forgor.jpg"
            alt="post's image"
            width={100}
            height={100}
            className="mr-2 mt-3 mb-2"
          />
          <div className="flex flex-col my-3 justify-between w-full">
            <div className="flex flex-col">
              <span className="font-bold text-2xl">{post.title}</span>
              <span className="text-sm text-white">{post.content}</span>
            </div>
            <div className="flex flex-row">
              <Link
                className="font-bold text-sm mr-2"
                href={`/user/${post.authorId}`}
              >
                @{post.authorId.split("@")[0]}
              </Link>
              <span className="text-sm">12H ago</span>
            </div>
          </div>
        </div>
        <div>
          <span className="justify-start font-bold text-xl">comments</span>
          {comments ? (
            comments.map((comment: any) => (
              <div className="border-2 rounded-lg my-3" key={comment.id}>
                <Comment comment={comment} />
              </div>
            ))
          ) : (
            <div className="m-10">No Comments</div>
          )}
        </div>
        <CommentInput refreshComment={setRefreshComment} postId={postId} />
      </div>
    </div>
  );
}
