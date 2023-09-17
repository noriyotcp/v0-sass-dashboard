import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const posts = await prisma.post.findMany({ where: { published: true }});

  return NextResponse.json(posts, { status: 200 })
}
