import { auth } from "@/src/lib/auth";
import { getCategory } from "@/src/queries/getCategory.query";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import CategoryUpdate from "./CategoryUpdate";

export const metadata: Metadata = {
  title: "Category",
};

type CategoryProps = {
  params: {
    categoryId: number;
  };
};

export default async function Page({ params }: CategoryProps) {
  const session = await auth();
  if (!session || session?.user.role !== "admin") redirect("/");

  const { categoryId } = params;

  const category = await getCategory(categoryId);

  return <CategoryUpdate category={category} />;
}
