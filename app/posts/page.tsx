import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";
import { headers } from "next/headers";
import { isPublished, formatDateTime, truncateString } from "@/lib/utils";
import DeletePostDialog from "./DeletePostDialog";
import PostRow from "./PostRow";

const fetchPosts = async (searchParams: string) => {
  const host = headers().get("host");
  const res = await fetch(`http://${host}/api/posts${searchParams}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export default async function Posts({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  const queryString = "?" + new URLSearchParams(searchParams).toString();
  const posts: Post[] = await fetchPosts(queryString);
  const publishedValue = new URLSearchParams(searchParams).get("published");
  const isActive = isPublished(publishedValue);

  return (
    <>
      <h2 className="text-xl mb-5">
        <Button asChild variant="link">
          <Link
            href={`posts?published=true`}
            className={`${isActive ? "active" : ""} [&.active]:underline`}
          >
            Posts
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link
            href={`posts?published=false`}
            className={`${isActive ? "" : "active"} [&.active]:underline`}
          >
            Drafts
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/posts/create`} className={`float-right`}>
            New
          </Link>
        </Button>
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => {
            return (
              <>
                <PostRow
                  key={post.id}
                  post={post}
                />
              </>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
