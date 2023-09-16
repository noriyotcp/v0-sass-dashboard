import { NextResponse } from "next/server";
import { users } from "@/lib/users";
const fetchUser = (id: string) => {
  return users.find((user) => user.id === parseInt(id));
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = fetchUser(params.id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}
