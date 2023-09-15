import { users } from '@/lib/users';
import { notFound } from "next/navigation";

const fetchUsers = (id: string) => {
  return users.find((user) => user.id === parseInt(id));
}

export default function User({ params }: { params: { id: string } }) {
  const user = fetchUsers(params.id);
  if (user === undefined) {
    return notFound();
  }

  return (
    <>
      <h2 className="text-xl mb-5">Welcome back, {user?.name}!</h2>
    </>
  );
}
