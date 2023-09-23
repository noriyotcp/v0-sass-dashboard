"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import DeletePostDialog from "./DeletePostDialog";
import { formatDateTime, truncateString } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function PostRow({ post }: {
  post: Post;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <TableRow key={post.id} className={isDeleting ? "on-delete" : ""}>
      <TableCell>{post.id}</TableCell>
      <TableCell>{post.title}</TableCell>
      <TableCell>{truncateString(post.content!, 32)}</TableCell>
      <TableCell>{formatDateTime(post.createdAt)}</TableCell>
      <TableCell>{formatDateTime(post.updatedAt)}</TableCell>
      <TableCell>
        <Button variant="link" disabled={isDeleting}>
          <Link href={`posts/${post.id}`}>Link</Link>
        </Button>
      </TableCell>
      <TableCell>
        <DeletePostDialog
          post={post}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          okText={"DELETE"}
        />
      </TableCell>
    </TableRow>
  );
}
