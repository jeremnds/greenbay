import { Check, X } from "lucide-react";
import Link from "next/link";
import { getCategory } from "../_lib/services";
import { CategoryNameType, ProductType } from "../_models/types";
import { buttonVariants } from "./ui/button";

export default async function Product({ product }: { product: ProductType }) {
  const category: CategoryNameType = await getCategory(product.category_id);
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {product.name}
      </td>
      {/* <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
        {product.description}
      </td> */}
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
        ${product.price.toFixed(2)}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
        {category.name}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
        {product.available ? (
          <Check className="text-green-600" />
        ) : (
          <X className="text-red-600" />
        )}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
        <Link href="#" className={buttonVariants({ variant: "outline" })}>
          View
        </Link>
      </td>
    </tr>
  );
}
