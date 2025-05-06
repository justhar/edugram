"use client";

import { Heart, MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Post(props: {
  post: {
    id: string;
    title: string;
    body: string;
    authorId: string;
    createdAt: string;
  };
}) {
  return (
    <Link
      className="flex flex-col cursor-pointer"
      href={`/post/${props.post.id}`}
    >
      <div className="justify-start flex-row flex">
        <Image
          src="/forgor.jpg"
          alt="post's image"
          width={70}
          height={70}
          className="mx-3 mt-3 mb-2"
        />
        <div className="flex flex-col my-3">
          <span className="font-bold text-2xl">{props.post.title}</span>
          <span className="text-sm text-gray-400">{props.post.body}</span>
        </div>
      </div>
      <div className="justify-between flex-row flex">
        <div className="mx-3">
          <span className="font-bold mr-2 text-sm">
            @{props.post.authorId.split("@")[0]}
          </span>
          <span className="text-sm">12H ago</span>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center font-bold text-sm gap-1 flex-row mb-2 mr-2">
            1.2k
            <MessagesSquare />
          </div>
          <div className="flex items-center font-bold text-sm gap-1 flex-row mb-2 mr-2">
            30k
            <Heart />
          </div>
        </div>
      </div>
    </Link>
  );
}
