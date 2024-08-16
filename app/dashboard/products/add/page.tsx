import { auth } from "@/src/lib/auth";
import { getCategories } from "@/src/queries/getCategories.query";
import { redirect } from "next/navigation";
import ProductCreate from "./ProductCreate";

export default async function Page() {
  const session = await auth();
  if (!session || session?.user.role !== "admin") redirect("/");
  const { categories } = await getCategories();

  return <ProductCreate categories={categories} />;
}
