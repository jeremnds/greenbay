import DashboardCard from "@/src/components/ui/DashboardCard";
import { Metadata } from "next";
import { getCategories, getProducts } from "@/src/lib/services";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const [productsData, categoriesData] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const { count: productsCount } = productsData;
  const { count: categoriesCount } = categoriesData;

  return (
    <div className="grid gap-8 max-w-sm lg:grid-cols-2 lg:max-w-2xl xl:grid-cols-3 xl:max-w-full ">
      <DashboardCard href="/dashboard/products/add" cardTitle="Products">
        There are currently {productsCount ? productsCount : "no"} products.
      </DashboardCard>
      <DashboardCard href="/dashboard/categories/add" cardTitle="Categories">
        There are currently {categoriesCount ? categoriesCount : "no"} products.
      </DashboardCard>
      <DashboardCard href="/dashboard/products/add" cardTitle="Users">
        3 Products
      </DashboardCard>
    </div>
  );
}
