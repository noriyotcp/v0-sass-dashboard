import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { headers } from "next/headers";

const fetchPost = async (id: string) => {
  const host = headers().get("host");
  const res = await fetch(`http://${host}/api/posts/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

const formatDateTime = (date: Date) => {
  const d = new Date(date);
  return d.toLocaleString();
}

export default async function Post({ params }: { params: { id: string } }) {
  const res = await fetchPost(params.id);
  if (res.status === 404) {
    return notFound();
  }
  const post = await res.json();

  return (
    <>
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
              Created : {formatDateTime(post.createdAt)} / Updated : {formatDateTime(post.updatedAt)}
            </div>
            <p className="text-2xl dark:text-zinc-400">{post.content}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Post ID: {post.id}
            </p>
            <Button variant="link" className="pl-0">
              <Link href="/posts">Back to Posts</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
