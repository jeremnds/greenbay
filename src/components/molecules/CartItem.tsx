import { updateQuantity } from "@/src/lib/features/cartSlice";
import { useAppDispatch } from "@/src/lib/hooks";
import { CartItemType } from "@/src/models/cartItem.type";
import { ProductType } from "@/src/models/product.type";
import { getProductClient } from "@/src/queries/getProductClient.query";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import ItemImage from "../atoms/ItemImage";
import NumberField from "../atoms/NumberField";
import Spinner from "../atoms/Spinner";

type CartItemProps = {
  cartItem: CartItemType;
};

export default function CartItem({ cartItem }: CartItemProps) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const productId = cartItem.product_id;
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setquantity] = useState(cartItem.quantity);
  const dispatch = useAppDispatch();

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
    setquantity(newQuantity);

    const item = {
      user_id: 1,
      product_id: productId,
      quantity: newQuantity,
    };
    dispatch(updateQuantity(item));
  }

  function handleIncrement() {
    const newQuantity = quantity + 1;
    setquantity(newQuantity);

    const item = {
      user_id: 1,
      product_id: productId,
      quantity: newQuantity,
    };
    dispatch(updateQuantity(item));
  }
  if (isLoading) return <Spinner />;

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
        <NumberField
          quantity={quantity}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
        />

        <Button variant="ghost" className="border border-muted">
          <Trash2 width={18} height={18} />
        </Button>
      </div>
    </li>
  );
}
