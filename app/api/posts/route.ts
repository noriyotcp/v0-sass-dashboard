import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let published;
  if (searchParams.has("published")) {
    published = searchParams.get("published");
    published = isPublished(published);
  } else {
    published = true;
  }
  const posts = await prisma.post.findMany({
    where: { published },
  });

  return NextResponse.json(posts, { status: 200 })
}

const isPublished = (published: string | null) => {
  if (!published) {
    return true;
  }
  return JSON.parse(published.toLocaleLowerCase());
}
