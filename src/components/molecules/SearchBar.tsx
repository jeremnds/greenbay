import { ArrowRight, Search } from "lucide-react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

export default function SearchBar() {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center w-full max-w-sm md:max-w-md lg:max-w-xl bg-background rounded-lg border border-input px-4 py-2 shadow-sm">
        <Search className="text-muted-foreground w-5 h-5" />
        <Input
          type="search"
          placeholder="Search..."
          className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none"
        />
        <Button type="submit" variant="ghost" className="ml-2">
          <ArrowRight className="text-muted-foreground w-5 h-5 " />
          <span className="sr-only">Submit</span>
        </Button>
      </div>
    </div>
  );
}
