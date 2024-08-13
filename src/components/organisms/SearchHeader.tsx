import { cn } from "@/src/lib/utils";
import BackButton from "../atoms/BackButton";
import SearchBar from "../molecules/SearchBar";

type SearchHeaderProps = {
  className?: string;
  query: string;
};

export default function SearchHeader({ className, query }: SearchHeaderProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {query && <BackButton />}
      <SearchBar />
    </div>
  );
}
