import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { headers } from "next/headers"

const fetchUsers = async () => {
  const host = headers().get("host")
  const res = await fetch(`http://${host}/api/users`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export default async function Users() {
  const users: User[] = await fetchUsers();

  return (
    <>
      <h2 className="text-xl mb-5">Welcome back, Users!</h2>
      <p>Here is the overview of users:</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt.toString()}</TableCell>
                <TableCell>{user.updatedAt.toString()}</TableCell>

                <TableCell>
                  <Link href={`users/${user.id}`}>
                    <Button variant="link">Link</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
