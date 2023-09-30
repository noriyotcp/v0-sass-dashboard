"use client";

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";

async function deletePost(
  post: Post,
  router: AppRouterInstance
): Promise<void> {
  await fetch(`/api/posts/${post.id}/delete`, {
    method: "DELETE",
  })
    .then(() => {
      router.push(`/posts?published=${post.published}`);
      router.refresh();
    })
    .catch((error) => console.error(error))
    .finally(() => {
      console.log(`Deleted post ${post.id}`);
    });
}

export default function DeleteButton({ post }: { post: Post }) {
  const router = useRouter();

  return (
    <>
      <Button
        asChild
        variant="outline"
        onClick={(_e) => {
          deletePost(post, router);
        }}
      >
        <Link href={`#`} className={`float-right`}>
          Delete
        </Link>
      </Button>
    </>
  );
}
