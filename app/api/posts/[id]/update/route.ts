import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type PostParams = Pick<Prisma.PostUpdateInput, "title" | "content" | "published">;

const updatePost = async (id: number, data: PostParams) => {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: { ...data },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    // https://github.com/prisma/prisma/blob/f718439571a60c91d3f5440226fe71031c84fa58/packages/client/src/runtime/core/errors/NotFoundError.ts#L5-L10
    if (error.code === "P2025") {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    } else {
      return NextResponse.json(
        { message: "Post not updated" },
        { status: 500 }
      );
    }
  }
};

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  // TODO: Inline method?
  const data: PostParams = await request.json();
  const res = await updatePost(Number(params.id), data);
  console.log(`request data`, data);
  return res;
}
