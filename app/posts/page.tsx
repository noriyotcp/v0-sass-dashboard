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
import { headers } from "next/headers"

const fetchPosts = async () => {
  const host = headers().get("host")
  const res = await fetch(`http://${host}/api/posts`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export default async function Posts() {
  const posts: Post[] = await fetchPosts();

  return (
    <>
      <h2 className="text-xl mb-5">Posts</h2>
      <p>Here is the overview of Published Posts:</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => {
            return (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>{post.createdAt.toString()}</TableCell>
                <TableCell>{post.updatedAt.toString()}</TableCell>

                <TableCell>
                  <Link href={`posts/${post.id}`}>
                    <Button variant="link">Link</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
