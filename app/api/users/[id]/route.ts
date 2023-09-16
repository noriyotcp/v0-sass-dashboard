import { NextResponse } from "next/server";
import { users } from "@/lib/users";
const fetchUser = (id: string) => {
  return users.find((user) => user.id === parseInt(id));
};

export async function GET(request: Request, context: any) {
  const user = fetchUser(context.params.id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}
