import DashboardCard from "@/src/components/molecules/DashboardCard";
import { auth } from "@/src/lib/auth";
import { getCategories } from "@/src/queries/getCategories.query";
import { getProducts } from "@/src/queries/getProducts.query";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const session = await auth();

  const isDemoMode = process.env.NEXT_PUBLIC_DEMOMODE === "true";

  if (!isDemoMode) {
    if (!session || session?.user?.role !== "admin") redirect("/");
  } else {
    if (!session) redirect("/");
  }

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
        There are currently {categoriesCount ? categoriesCount : "no"}{" "}
        categories.
      </DashboardCard>
    </div>
  );
}
