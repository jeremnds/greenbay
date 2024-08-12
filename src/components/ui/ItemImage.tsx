import { CategoryType } from "@/src/models/category.type";
import { ProductType } from "@/src/models/product.type";
import Image from "next/image";

type ItemImageProps = {
  item: CategoryType | ProductType;
};

export default function ItemImage({ item }: ItemImageProps) {
  return (
    <>
      {item.image ? (
        <div className="relative h-72 w-60">
          <Image
            src={item.image}
            alt={`Image of ${item.name}`}
            priority
            fill
            className="object-cover object-bottom"
          />
        </div>
      ) : (
        <div className="h-72 w-60 bg-gray-200 font-bold flex items-center justify-center">
          <p>NO IMAGE YET</p>
        </div>
      )}
    </>
  );
}
