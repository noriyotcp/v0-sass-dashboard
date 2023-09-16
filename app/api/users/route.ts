import { NextResponse } from "next/server";
import { users } from "@/lib/users";

export async function GET(request: Request) {
  return NextResponse.json(users, { status: 200 })
}
