import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const { title, content } = data;

  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
    },
  });

  return NextResponse.json(result, { status: 201 });
}
