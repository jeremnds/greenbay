import { ProductsType } from "../../models/products.type";
import ProductRow from "../molecules/ProductRow";

export default function ProductTable({ products }: { products: ProductsType }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:bg-black dark:divide-gray-700 ">
        <thead className="text-left">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-400">
              Name
            </th>

            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-400">
              Category
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-400">
              Price
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-400">
              Available
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product) => (
            <ProductRow product={product} key={product.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
