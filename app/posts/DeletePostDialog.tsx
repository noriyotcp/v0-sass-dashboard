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
  setIsDeleting: (isDeleting: boolean) => void,
  redirectURL?: string
): Promise<void> {
  setIsDeleting(true);

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
        setIsDeleting(false);
      });
    });
}

export default function DeletePostDialog({
  post,
  isDeleting: isDeleting,
  setIsDeleting: setIsDeleting,
  redirectUrl,
  okText,
}: {
  post: Post;
  isDeleting: boolean;
  setIsDeleting: (isDeleting: boolean) => void;
  redirectUrl?: string;
  okText?: string;
}) {
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:text-red-600" disabled={isDeleting}>
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
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            className="bg-red-500"
            onClick={(_e) =>
              deletePost(post.id, router, setIsDeleting, redirectUrl)
            }
          >
            {okText ?? "OK"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
