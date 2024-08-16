import { auth } from "@/src/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Users",
};

export default async function Page() {
  const session = await auth();
  if (!session || session?.user.role !== "admin") redirect("/");
  return <div>Users</div>;
}
