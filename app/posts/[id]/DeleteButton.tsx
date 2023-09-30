"use client";

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";
import { startTransition } from "react";

async function deletePost(
  post: Post,
  router: AppRouterInstance,
  setIsDeleting: (isDeleting: boolean) => void
): Promise<void> {
  setIsDeleting(true);

  await fetch(`/api/posts/${post.id}/delete`, {
    method: "DELETE",
  })
    .then(() => {
      router.push(`/posts?published=${post.published}`);
      router.refresh();
    })
    .catch((error) => console.error(error))
    .finally(() => {
      startTransition(() => {
        setIsDeleting(false);
      });
    });
}

export default function DeleteButton({
  post,
  isDeleting,
  setIsDeleting,
}: {
  post: Post;
  isDeleting: boolean;
  setIsDeleting: (isDeleting: boolean) => void;
}) {
  const router = useRouter();

  return (
    <>
      <Button
        asChild
        variant="outline"
        onClick={(_e) => {
          deletePost(post, router, setIsDeleting);
        }}
      >
        <Link href={`#`} className={`float-right`}>
          Delete
        </Link>
      </Button>
    </>
  );
}
