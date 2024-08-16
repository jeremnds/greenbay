import { ProductType } from "@/src/models/product.type";
import { useCartStore } from "@/src/store/cartStore";
import { Session } from "next-auth";
import Link from "next/link";
import AddToCartBtn from "../atoms/AddToCartBtn";
import ItemImage from "../atoms/ItemImage";

type ProductCardProps = {
  product: ProductType;
  session: Session | null;
};

export default function ProductCard({ product, session }: ProductCardProps) {
  const { addItem } = useCartStore();
  let customerId = 1;
  if (session?.user) customerId = session.user.customerId;

  const item = {
    user_id: customerId,
    product_id: product.id,
    quantity: 1,
    price: product.price,
  };

  return (
    <div className="relative hover:scale-105 transition-all group">
      <Link href={`/products/${product.id}`}>
        <ItemImage item={product} className="w-full " />
        <div className="flex items-center justify-between w-full">
          <p className="group-hover:text-primary">{product.name}</p>
          <span className="text-slate-700 dark:text-slate-400">
            ${product.price}
          </span>
        </div>
      </Link>
      <AddToCartBtn
        className="bottom-0 absolute bg-white left-1/2 transform -translate-x-1/2 transition-all duration-300 hidden  group-hover:animate-showup group-hover:block group-hover:bottom-8 animate-hide text-black dark:hover:text-white"
        onClick={() => addItem(item)}
      />
    </div>
  );
}
