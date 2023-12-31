import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const { title, content, published } = data;

  const result = await prisma.post.create({
    data: {
      title,
      content,
      published,
    },
  });

  return NextResponse.json(result, { status: 201 });
}
