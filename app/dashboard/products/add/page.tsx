import { auth } from "@/src/lib/auth";
import { getCategories } from "@/src/queries/getCategories.query";
import { redirect } from "next/navigation";
import ProductCreate from "./ProductCreate";

export default async function Page() {
  const session = await auth();
  const isDemoMode = process.env.NEXT_PUBLIC_DEMOMODE === "true";

  if (!isDemoMode) {
    if (!session || session?.user?.role !== "admin") redirect("/");
  } else {
    if (!session) redirect("/");
  }
  const { categories } = await getCategories();

  return <ProductCreate categories={categories} />;
}
