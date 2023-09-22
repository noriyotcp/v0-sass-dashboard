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
  window.location.reload(); // Close the dialog
}

export default function DeletePostDialog(props: { post: Post; redirectUrl?: string }) {
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger>DELETE</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Link
              href="#"
              onClick={(_e) =>
                deletePost(props.post.id, router, props.redirectUrl)
              }
            >
              {"OK"}
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
