import { getCategory } from "@/src/queries/getCategory.query";
import { Metadata } from "next";
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
  const { categoryId } = params;

  const category = await getCategory(categoryId);

  return <CategoryUpdate category={category} />;
}
