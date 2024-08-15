import { CartItemType } from "@/src/models/cartItem.type";
import { ProductType } from "@/src/models/product.type";
import { getProductClient } from "@/src/queries/getProductClient.query";
import { useEffect, useState } from "react";
import ItemImage from "../atoms/ItemImage";
import { Skeleton } from "../atoms/Skeleton";

type CheckoutItemProps = {
  checkoutItem: CartItemType;
};

export default function CheckoutItem({ checkoutItem }: CheckoutItemProps) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const productId = checkoutItem.product_id;
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(checkoutItem.quantity);

  useEffect(() => {
    async function loadProduct() {
      const productInCart = await getProductClient(productId);
      setProduct(productInCart);
      setIsLoading(false);
    }
    loadProduct();
  }, [productId]);

  if (isLoading) return <Skeleton className="h-16 rounded-ful" />;

  return (
    <li className="flex items-center gap-4">
      <ItemImage item={product} className="h-16 w-16" placeholderText={false} />

      <div>
        <h3 className="text-sm text-gray-900 dark:text-gray-100">
          {product?.name}
        </h3>

        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-gray-400">
          <div className="flex flex-col">
            <div>
              <dt className="inline">Price: </dt>
              <dd className="inline">${product?.price}</dd>
            </div>
            <div>
              <dt className="inline">Quantity: </dt>
              <dd className="inline">{checkoutItem?.quantity}</dd>
            </div>
          </div>
        </dl>
      </div>
    </li>
  );
}
