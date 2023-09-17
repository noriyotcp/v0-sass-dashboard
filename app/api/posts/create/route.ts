import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const { title, content } = data;
  return NextResponse.json({ title, content }, { status: 201 });
}
