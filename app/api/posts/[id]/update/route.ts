import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type PostParams = Pick<Prisma.PostUpdateInput, "title" | "content">;

const updatePost = async (id: number, data: PostParams) => {
  try {
    const post = await prisma.post.findUniqueOrThrow({ where: { id: id } });
    await prisma.post.update({
      where: { id },
      data: { ...data },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
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
