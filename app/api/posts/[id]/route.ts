import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const fetchPost = async (id: number) => {
  try {
    const post = await prisma.post.findUniqueOrThrow({ where: { id: id } });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
  }
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const res = await fetchPost(Number(params.id));
  return res;
}
