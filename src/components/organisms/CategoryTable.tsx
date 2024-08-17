import { CategoriesType } from "../../models/categories.type";
import CategoryRow from "../molecules/CategoryRow";

type CategoryTableProps = {
  categories: CategoriesType;
};

export default async function CategoryTable({
  categories,
}: CategoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:bg-stone-950 dark:divide-stone-700">
        <thead className="text-left">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-400">
              ID
            </th>

            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-400">
              Name
            </th>

            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-stone-700">
          {categories.map((category) => (
            <CategoryRow category={category} key={category.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
