"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import FullscreenLoading from "@/components/FullscreenLoading";
import { Post } from "@prisma/client";

import PostContent from "./PostContent";
import DeleteButton from "./DeleteButton";

export default function Post({
  post,
}: {
  post: Post;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      {isDeleting ? (
        <FullscreenLoading />
      ) : (
        <section className="w-full">
          <h2 className="text-xl mb-5">
            <Badge
              variant="outline"
              className={`${
                post.published ? "published" : ""
              } [&.published]:bg-lime-600 [&.published]:text-white`}
            >
              {post.published ? "Published" : "Drafted"}
            </Badge>
            <DeleteButton
              post={post}
              isDeleting={isDeleting}
              setIsDeleting={setIsDeleting}
            />
            <Button asChild variant="outline">
              <Link href={`/posts/${post.id}/edit`} className={`float-right`}>
                Edit
              </Link>
            </Button>
          </h2>

          <div className="container">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter">
                {post.title}
              </h1>
              <div className="flex text-zinc-500 space-x-1">
                Created : {formatDateTime(post.createdAt)} / Updated :{" "}
                {formatDateTime(post.updatedAt)}
              </div>
              <PostContent post={post} />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Post ID: {post.id}
              </p>
              <Button variant="link" className="pl-0">
                {post.published ? (
                  <Link href={`/posts`}>Back to Posts</Link>
                ) : (
                  <Link href={`/posts?published=false`}>Back to Drafts</Link>
                )}
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
