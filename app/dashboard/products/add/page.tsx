import CreateProduct from "@/src/components/CreateProduct";
import { getCategories } from "@/src/lib/services";

export default async function Page() {
  const { categories } = await getCategories();

  return <CreateProduct categories={categories} />;
}
