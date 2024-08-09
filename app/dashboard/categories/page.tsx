import CategoriesTable from "@/app/_components/CategoriesTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

export default function Page() {
  return <CategoriesTable />;
}
