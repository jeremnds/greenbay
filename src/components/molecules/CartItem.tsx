import { CartItemType } from "@/src/models/cartItem.type";
import { ProductType } from "@/src/models/product.type";
import { getProductClient } from "@/src/queries/getProductClient.query";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import ItemImage from "../atoms/ItemImage";

type CartItemProps = {
  cartItem: CartItemType;
};

export default function CartItem({ cartItem }: CartItemProps) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const productId = cartItem.product_id;

  useEffect(() => {
    async function loadProduct() {
      const productInCart = await getProductClient(productId);
      setProduct(productInCart);
    }
    loadProduct();
  }, [productId]);

  return (
    <li className="flex items-center gap-4">
      <ItemImage item={product} className="h-16 w-16" placeholderText={false} />

      <div>
        <h3 className="text-sm text-gray-900">{product?.name}</h3>

        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
          <div>
            <dt className="inline">Price:</dt>
            <dd className="inline">${product?.price}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <form>
          <label htmlFor="Line1Qty" className="sr-only">
            {" "}
            Quantity{" "}
          </label>

          <input
            type="number"
            min="1"
            defaultValue={cartItem.quantity}
            id="Line1Qty"
            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
        </form>

        <button className="">
          <span className="sr-only">Remove item</span>
          <Trash2
            width={16}
            height={16}
            className="text-gray-500 hover:text-red-600  transition  "
          />
        </button>
      </div>
    </li>
  );
}
