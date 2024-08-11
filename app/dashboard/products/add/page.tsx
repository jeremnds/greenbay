import CreateProduct from "@/app/_components/CreateProduct";
import { getCategories } from "@/app/_lib/services";

export default async function Page() {
  const { categories } = await getCategories();

  return <CreateProduct categories={categories} />;
}
