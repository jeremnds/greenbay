import { cn } from "@/src/lib/utils";
import { CategoryType } from "@/src/models/category.type";
import { ProductType } from "@/src/models/product.type";
import Image from "next/image";

type ItemImageProps = {
  item: CategoryType | ProductType;
  className?: string;
};

export default function ItemImage({ item, className }: ItemImageProps) {
  return (
    <>
      {item.image ? (
        <div className={cn("relative h-72 w-full", className)}>
          <Image
            src={item.image}
            alt={`Image of ${item.name}`}
            priority
            sizes="(max-width: 768px) 100vw, 
            (max-width: 1200px) 50vw, 
            33vw"
            fill
            className="object-cover object-bottom "
          />
        </div>
      ) : (
        <div
          className={cn(
            "h-72 w-60 bg-gray-600 font-bold flex text-white items-center justify-center",
            className
          )}
        >
          <p>NO IMAGE YET</p>
        </div>
      )}
    </>
  );
}
