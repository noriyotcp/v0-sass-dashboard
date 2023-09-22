"use client";

import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

async function deletePost(
  id: number,
  router: AppRouterInstance,
  redirectURL?: string
): Promise<void> {
  await fetch(`/api/posts/${id}/delete`, {
    method: "DELETE",
  });
  if (redirectURL) {
    router.push(redirectURL);
  }
  router.refresh();
}

export default function DeleteButton(props: { post: Post; redirectUrl?: string }) {
  const router = useRouter();

  return (
    <Link
      href="#"
      onClick={(_e) =>
        deletePost(props.post.id, router, props.redirectUrl)
      }
    >
      <Button variant="link">Delete</Button>
    </Link>
  );
}
