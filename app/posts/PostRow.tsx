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
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>{post.title}</TableCell>
      <TableCell>{truncateString(post.content!, 32)}</TableCell>
      <TableCell>{formatDateTime(post.createdAt)}</TableCell>
      <TableCell>{formatDateTime(post.updatedAt)}</TableCell>
      <TableCell>
        <Link href={`posts/${post.id}`}>
          <Button variant="link">Link</Button>
        </Link>
      </TableCell>
      <TableCell>
        <DeletePostDialog
          post={post}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          okText={"DELETE"}
        />
      </TableCell>
    </TableRow>
  );
}
