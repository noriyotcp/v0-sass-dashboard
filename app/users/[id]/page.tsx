import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";

const fetchUser = async (id: string) => {
  const host = headers().get("host");
  const res = await fetch(`http://${host}/api/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};


export default async function User({ params }: { params: { id: string } }) {
  const res = await fetchUser(params.id);
  if (res.status === 404) {
    return notFound();
  }
  const user = await res.json();

  return (
    <>
      <h2 className="text-xl mb-5">Welcome back, {user.name}!</h2>
      <Button variant="link">
        <Link href="/users">Back to Users</Link>
      </Button>
    </>
  );
}
