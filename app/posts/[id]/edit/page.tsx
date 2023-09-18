import { headers } from "next/headers";
import { EditPostForm } from "../../form";
import { notFound } from "next/navigation";
import { Post } from "@prisma/client";

export default async function EditPost({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) {
  const fetchPost = async (id: string) => {
    const host = headers().get("host");
    const res = await fetch(`http://${host}/api/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  };

  const res = await fetchPost(params.id);
  if (res.status === 404) {
    return notFound();
  }
  const post: Post = await res.json();

  return (
    <>
      <EditPostForm post={post} />
    </>
  );
}
