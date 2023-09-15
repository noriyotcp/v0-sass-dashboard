/**
 * v0 by Vercel Labs.
 * @see https://v0.dev/t/4Sx7Rt7
 */
import Link from "next/link";
import Users from "./users/page";

export default function Home() {
  return (
    <>
      <div className="text-xl mb-5">Dashboard!</div>
      <h2 className="text-xl mb-5">Welcome back, User!</h2>
      <p>Here is the overview of your account:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        <div className="p-5 border rounded-md">
          <h3 className="text-lg mb-2">Total Users</h3>
          <p>500</p>
        </div>
        <div className="p-5 border rounded-md">
          <h3 className="text-lg mb-2">New Users Today</h3>
          <p>50</p>
        </div>
        <div className="p-5 border rounded-md">
          <h3 className="text-lg mb-2">Active Users</h3>
          <p>350</p>
        </div>
      </div>
    </>
  );
}
