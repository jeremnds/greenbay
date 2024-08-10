import Link from "next/link";
import { CategoryType } from "../_models/types";
import { buttonVariants } from "./ui/shadcn/button";

export default function Category({ category }: { category: CategoryType }) {
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {category.id}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
        {category.name}
      </td>

      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
        <Link
          href={`/dashboard/categories/${category.id}`}
          className={buttonVariants({ variant: "outline" })}
        >
          View
        </Link>
      </td>
    </tr>
  );
}
