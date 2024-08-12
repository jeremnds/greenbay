"use client";

import { SearchFormData } from "@/src/models/searchFormData.type";
import { SearchSchema } from "@/src/schemas/SearchSchema.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

export default function SearchBar() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(SearchSchema),
  });

  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  function handleSearch(formData: SearchFormData) {
    const params = new URLSearchParams(searchParams);
    if (formData.search) params.set("query", formData.search);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex  justify-center w-full ">
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="flex items-center  max-w-sm md:max-w-md lg:w-full bg-background rounded-lg border border-input px-4 py-2 shadow-sm"
      >
        <Search className="text-muted-foreground w-5 h-5 mr-2" />
        <Input
          {...register("search")}
          type="search"
          placeholder="Search..."
          className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none"
          defaultValue={searchParams.get("query")?.toString()}
        />
        <Button type="submit" variant="ghost" className="ml-2">
          {isSubmitting ? (
            <Loader className="text-muted-foreground w-5 h-5 animate-spin" />
          ) : (
            <>
              <ArrowRight className="text-muted-foreground w-5 h-5" />
              <span className="sr-only">Submit</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
