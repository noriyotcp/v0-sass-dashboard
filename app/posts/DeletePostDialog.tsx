"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Post } from "@prisma/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

async function deletePost(
  id: number,
  router: AppRouterInstance,
  setIsSubmitting: (isSubmitting: boolean) => void,
  redirectURL?: string,
): Promise<void> {
  setIsSubmitting(true);

  await fetch(`/api/posts/${id}/delete`, {
    method: "DELETE",
  })
    .then(() => {
      if (redirectURL) {
        router.push(redirectURL);
      }
      window.location.reload(); // Close the dialog
    })
    .catch((error) => console.error(error))
    .finally(() => {
      startTransition(() => {
        setIsSubmitting(false);
      });
    });
}

export default function DeletePostDialog({ post, redirectUrl, okText }: { post: Post; redirectUrl?: string; okText?: string}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:text-red-600">
        DELETE
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isSubmitting}>
            <Link
              href="#"
              onClick={(_e) =>
                deletePost(post.id, router, setIsSubmitting, redirectUrl)
              }
            >
              {okText ?? "OK"}
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
