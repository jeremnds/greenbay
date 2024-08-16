"use client";

import { cn } from "@/src/lib/utils";
import { CategoryType } from "@/src/models/category.type";
import { OrderItemType } from "@/src/models/orderItem.type";
import { ProductType } from "@/src/models/product.type";
import Image from "next/image";
import { useState } from "react";
import Spinner from "./Spinner";

type ItemImageProps = {
  item: CategoryType | ProductType | OrderItemType | null;
  className?: string;
  placeholderText?: boolean;
};

export default function ItemImage({
  item,
  className,
  placeholderText = true,
}: ItemImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={cn("relative h-72 w-full", className)}>
      {item?.image ? (
        <>
          <Image
            src={item.image}
            alt={`Image of ${item.name}`}
            priority
            sizes="(max-width: 768px) 100vw, 
            (max-width: 1200px) 50vw, 
            33vw"
            fill
            className={cn(
              "object-cover object-bottom transition-opacity duration-500",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-gray-600 text-white",
                className
              )}
            >
              <Spinner className="text-white" />
            </div>
          )}
        </>
      ) : (
        <div
          className={cn(
            "h-72 w-full bg-gray-600 font-bold flex text-white items-center justify-center",
            className
          )}
        >
          {placeholderText && <p>NO IMAGE AVAILABLE</p>}
        </div>
      )}
    </div>
  );
}
