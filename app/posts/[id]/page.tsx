import { headers } from "next/headers";
import { notFound } from "next/navigation";

import Post from "./Post";

const fetchPost = async (id: string) => {
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocal}://${host}/api/posts/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export default async function PostContainer({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetchPost(params.id);
  if (res.status === 404) {
    return notFound();
  }
  const post = await res.json();

  return <Post post={post} />;
}
