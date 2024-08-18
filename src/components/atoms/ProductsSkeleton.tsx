import { ITEMS_PER_PAGE } from "@/src/lib/constants";
import { Skeleton } from "./Skeleton";

export default function ProductsSkeleton() {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 my-6 gap-8">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <Skeleton key={index} className="w-full h-[310px] bg-gray-500" />
        ))}
      </div>

      <div className="flex items-center space-x-1 justify-center">
        <Skeleton className="h-8 w-8 rounded-md bg-gray-500  " />
        <Skeleton className="h-8 w-8 rounded-md bg-gray-500" />
        <Skeleton className="h-8 w-8 rounded-md bg-gray-500" />
        <Skeleton className="h-8 w-8 rounded-md bg-gray-500" />
        <Skeleton className="h-8 w-8 rounded-md bg-gray-500" />
      </div>
    </>
  );
}
