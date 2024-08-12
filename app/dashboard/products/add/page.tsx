import { getCategories } from "@/src/queries/getCategories.query";
import ProductCreate from "./ProductCreate";

export default async function Page() {
  const { categories } = await getCategories();

  return <ProductCreate categories={categories} />;
}
