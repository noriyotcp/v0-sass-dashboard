import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const deletePost = async (id: number) => {
  try {
    await prisma.post.delete({ where: { id }});
    // cf. https://github.com/vercel/next.js/discussions/51475#discussioncomment-6216369
    return new Response(null, { status: 204 });
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    // https://github.com/prisma/prisma/blob/f718439571a60c91d3f5440226fe71031c84fa58/packages/client/src/runtime/core/errors/NotFoundError.ts#L5-L10
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: `Post ID: ${id} not found` },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { message: `Post not deleted`, error: error },
        { status: 500 }
      );
    }
  }
};

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await deletePost(Number(params.id));
  return res;
}
