import UpdateCategory from "@/app/_components/UpdateCategory";
import { getCategory } from "@/app/_lib/services";
import { Metadata } from "next";

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

  return <UpdateCategory />;
}
