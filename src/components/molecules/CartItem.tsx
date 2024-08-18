import { CartItemType } from "@/src/models/cartItem.type";
import { ProductType } from "@/src/models/product.type";
import { getProductClient } from "@/src/queries/getProductClient.query";
import { useCartStore } from "@/src/store/cartStore";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import ItemImage from "../atoms/ItemImage";
import NumberField from "../atoms/NumberField";
import { Skeleton } from "../atoms/Skeleton";

type CartItemProps = {
  cartItem: CartItemType;
};

export default function CartItem({ cartItem }: CartItemProps) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const productId = cartItem.product_id;
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const { data: session } = useSession();
  const customerId = session?.user?.customerId ?? 1;

  useEffect(() => {
    async function loadProduct() {
      const productInCart = await getProductClient(productId);
      setProduct(productInCart);
      setIsLoading(false);
    }
    loadProduct();
  }, [productId]);

  function handleDecrement() {
    const newQuantity = quantity > 1 ? quantity - 1 : quantity;
    setQuantity(newQuantity);

    updateQuantity(customerId, productId, newQuantity);
  }

  function handleIncrement() {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    updateQuantity(customerId, productId, newQuantity);
  }

  if (isLoading) return <Skeleton className="h-16 rounded-ful" />;

  return (
    <li className="flex items-center gap-4">
      <ItemImage item={product} className="h-16 w-16" placeholderText={false} />

      <div>
        <h3 className="text-sm text-gray-900 dark:text-gray-100">
          {product?.name}
        </h3>

        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-gray-400 ">
          <div className="">
            <dt className="inline">Price: </dt>
            <dd className="inline">${product?.price}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <NumberField
          quantity={quantity}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
        />

        <Button
          variant="ghost"
          className="border border-muted"
          onClick={() => removeItem(customerId, productId)}
        >
          <Trash2 width={18} height={18} />
        </Button>
      </div>
    </li>
  );
}
