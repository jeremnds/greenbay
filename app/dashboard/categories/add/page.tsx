import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import CategoryCreate from "./CategoryCreate";

export default async function Page() {
  const session = await auth();
  if (!session || session?.user.role !== "admin") redirect("/");

  return <CategoryCreate />;
}
