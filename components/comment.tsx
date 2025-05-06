"use client";

import Image from "next/image";
import Link from "next/link";

export default function Comment(props: {
  comment: {
    id: any;
    content: any;
    authorId: any;
    createdAt: any;
  };
}) {
  return (
    <div className="flex flex-col cursor-pointer">
      <div className="justify-start flex-row flex">
        <Image
          src="/forgor.jpg"
          alt="post's image"
          width={70}
          height={70}
          className="mx-3 mt-3 mb-2"
        />
        <span className="text-md mt-2">{props.comment.content}</span>
      </div>
      <div className="justify-between flex-row flex">
        <div className="mx-3 mb-2">
          <span className="font-bold mr-2 text-sm">
            @{props.comment.authorId.split("@")[0]}
          </span>
          <span className="text-sm">12H ago</span>
        </div>
      </div>
    </div>
  );
}
