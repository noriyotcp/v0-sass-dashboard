import { notFound } from "next/navigation";
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

export default async function Post({ params }: { params: { id: string } }) {
  const res = await fetchPost(params.id);
  if (res.status === 404) {
    return notFound();
  }
  const post = await res.json();

  return (
    <>
      <h2 className="text-xl mb-5">
        <Badge
          variant="outline"
          className={`${
            post.published ? "published" : ""
          } [&.published]:bg-lime-600 [&.published]:text-white`}
        >
          {post.published ? "Published" : "Drafted"}
        </Badge>
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.content}</TableCell>
            <TableCell>{post.createdAt.toString()}</TableCell>
            <TableCell>{post.updatedAt.toString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button variant="link">
        <Link href="/posts">Back to Posts</Link>
      </Button>
    </>
  );
}
