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
import { useRouter } from "next/navigation";
import { startTransition } from "react";

async function deletePost(
  id: number,
  router: AppRouterInstance,
  setIsSubmitting: (isSubmitting: boolean) => void,
  redirectURL?: string
): Promise<void> {
  setIsSubmitting(true);

  await fetch(`/api/posts/${id}/delete`, {
    method: "DELETE",
  })
    .then(() => {
      if (redirectURL) {
        router.push(redirectURL);
      }
      router.refresh();
    })
    .catch((error) => console.error(error))
    .finally(() => {
      startTransition(() => {
        setIsSubmitting(false);
      });
    });
}

export default function DeletePostDialog({
  post,
  isSubmitting,
  setIsSubmitting,
  redirectUrl,
  okText,
}: {
  post: Post;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  redirectUrl?: string;
  okText?: string;
}) {
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:text-red-600" disabled={isSubmitting}>
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
          <AlertDialogAction
            disabled={isSubmitting}
            className="bg-red-500"
            onClick={(_e) =>
              deletePost(post.id, router, setIsSubmitting, redirectUrl)
            }
          >
            {okText ?? "OK"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
