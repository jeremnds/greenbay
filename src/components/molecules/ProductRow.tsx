import { Check, X } from "lucide-react";
import Link from "next/link";
import { ProductType } from "../../models/product.type";
import { getCategory } from "../../queries/getCategory.query";
import { buttonVariants } from "../atoms/Button";

export default async function ProductRow({
  product,
}: {
  product: ProductType;
}) {
  const category: { name: string } = await getCategory(product.category_id);
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-500">
        {product.name}
      </td>

      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-300">
        {category.name}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700  dark:text-gray-300">
        ${product.price.toFixed(2)}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700  dark:text-gray-300">
        {product.available ? (
          <Check className="text-green-600" />
        ) : (
          <X className="text-red-600" />
        )}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700  dark:text-gray-300">
        <Link
          href={`/dashboard/products/edit/${product.id}`}
          className={buttonVariants({ variant: "outline" })}
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
