"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Post } from "@prisma/client";
import remarkGfm from "remark-gfm";

export default function PostContent({ post }: { post: Post }) {
  return (
    // <p className="text-2xl dark:text-zinc-400">
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown" linkTarget={"_blank"}>
        {post.content ? post.content : ""}
      </ReactMarkdown>
    // </p>
  )
}
