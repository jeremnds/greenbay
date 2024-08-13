"use client";

import { cn } from "@/src/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigateToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <ol className="flex justify-center gap-1 text-xs font-medium mt-6">
      {/* Prev Page */}
      <li>
        <button
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white dark:bg-black dark:text-gray-100 text-gray-900",
            {
              "opacity-50 cursor-not-allowed": currentPage === 1,
            }
          )}
        >
          <span className="sr-only">Prev Page</span>
          <ChevronLeft className="h-3 w-3" />
        </button>
      </li>

      {/* Numbered Pages */}
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <li key={page}>
            <button
              onClick={() => navigateToPage(page)}
              className={cn(
                "block size-8 rounded border text-center leading-8",
                {
                  "border-green-600 bg-green-600 text-white dark:text-black":
                    currentPage === page,
                  "border-gray-100 bg-white text-gray-900 dark:bg-black dark:text-gray-100":
                    currentPage !== page,
                }
              )}
            >
              {page}
            </button>
          </li>
        );
      })}

      {/* Next Page */}
      <li>
        <button
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 dark:bg-black dark:text-gray-100",
            {
              "opacity-50 cursor-not-allowed": currentPage === totalPages,
            }
          )}
        >
          <span className="sr-only">Next Page</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </li>
    </ol>
  );
}
