import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import CategoryCreate from "./CategoryCreate";

export default async function Page() {
  const session = await auth();
  const isDemoMode = process.env.NEXT_PUBLIC_DEMOMODE === "true";

  if (!isDemoMode) {
    if (!session || session?.user?.role !== "admin") redirect("/");
  } else {
    if (!session) redirect("/");
  }

  return <CategoryCreate />;
}
