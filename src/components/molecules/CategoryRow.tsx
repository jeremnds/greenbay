import Link from "next/link";
import { CategoryType } from "../../models/category.type";
import { buttonVariants } from "../atoms/Button";

export default function CategoryRow({ category }: { category: CategoryType }) {
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900  dark:text-gray-500">
        {category.id}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
        {category.name}
      </td>

      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
        <Link
          href={`/dashboard/categories/edit/${category.id}`}
          className={buttonVariants({ variant: "outline" })}
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
