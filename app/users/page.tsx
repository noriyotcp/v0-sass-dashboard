import RootLayout from "../layout";
import { users } from "@/lib/users";
import Link from "next/link";

export default function Users() {
  const [firstUser, ...rest] = users;

  return (
    <>
      <h2 className="text-xl mb-5">Welcome back, Users!</h2>
      <p>Here is the overview of users:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        <Link href={`users/${firstUser.id.toString()}`}>
          <div className="p-5 border rounded-md">
            <h3 className="text-lg mb-2">{firstUser.name}</h3>
            <p>@{firstUser.username}</p>
            <p>{firstUser.email}</p>
          </div>
        </Link>
        {rest.map((user) => (
          <Link href={`users/${user.id.toString()}`} key={user.id}>
            <div className="p-5 border rounded-md" key={user.id}>
              <h3 className="text-lg mb-2">{user.name}</h3>
              <p>@{user.username}</p>
              <p>{user.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
