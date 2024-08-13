import { addItem } from "@/src/lib/features/cartSlice";
import { useAppDispatch } from "@/src/lib/hooks";
import { ProductType } from "@/src/models/product.type";
import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "../atoms/Button";
import ItemImage from "../atoms/ItemImage";

type ProductCardProps = {
  product: ProductType;
  session: Session | null;
};

export default function ProductCard({ product, session }: ProductCardProps) {
  const dispatch = useAppDispatch();

  let customerId = 1;
  if (session?.user) customerId = session.user.customerId;

  const item = {
    user_id: customerId,
    product_id: product.id,
    quantity: 1,
  };

  return (
    <div className="relative hover:scale-105 transition-all group">
      <Link href={`/products/${product.id}`}>
        <ItemImage item={product} className="w-full " />
        <div className="flex items-center justify-between w-full">
          <p className="group-hover:text-primary">{product.name}</p>
          <span className="text-green-900">${product.price}</span>
        </div>
      </Link>
      <Button
        variant="ghost"
        className="rounded-full border border-input hover:bg-green-900/95 hover:text-white px-8 uppercase bottom-0 absolute bg-white left-1/2 transform -translate-x-1/2 transition-all duration-300 hidden  group-hover:animate-showup group-hover:block group-hover:bottom-8 animate-hide text-black dark:hover:text-white"
        onClick={() => dispatch(addItem(item))}
      >
        Add to cart
      </Button>
    </div>
  );
}
