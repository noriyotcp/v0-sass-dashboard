import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const fetchUser = async (id: string) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: id } });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  }
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const res = await fetchUser(params.id);
  return res;
}
