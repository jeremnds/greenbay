"use client";

import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams);
  const navigateToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`?page=${page}`);
    }
  };

  return (
    <ol className="flex justify-center gap-1 text-xs font-medium mt-6">
      {/* Prev Page */}
      <li>
        <button
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>

      {/* Numbered Pages */}
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <li key={page}>
            <button
              onClick={() => navigateToPage(page)}
              className={`block size-8 rounded border text-center leading-8 ${
                currentPage === page
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-100 bg-white text-gray-900"
              }`}
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
          className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ol>
  );
}
