import { CategoriesType } from "../../models/categories.type";
import Category from "../molecules/CategoryRow";

type CategoriesTableProps = {
  categories: CategoriesType;
};

export default async function CategoriesTable({
  categories,
}: CategoriesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="text-left">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              ID
            </th>

            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>

            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {categories.map((category) => (
            <Category category={category} key={category.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
