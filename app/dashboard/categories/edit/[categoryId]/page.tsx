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
  const isDemoMode = process.env.NEXT_PUBLIC_DEMOMODE === "true";

  if (!isDemoMode) {
    if (!session || session?.user?.role !== "admin") redirect("/");
  } else {
    if (!session) redirect("/");
  }

  const { categoryId } = params;

  const category = await getCategory(categoryId);

  return <CategoryUpdate category={category} />;
}
