import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

export default function SearchBar() {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center w-full max-w-sm md:max-w-md lg:max-w-xl bg-background rounded-lg border border-input px-4 py-2 shadow-sm">
        <SearchIcon />
        <Input
          type="search"
          placeholder="Search..."
          className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none"
        />
        <Button type="submit" variant="ghost" className="ml-2">
          <ArrowRightIcon />
          <span className="sr-only">Submit</span>
        </Button>
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="w-5 h-5 text-muted-foreground"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="w-5 h-5 text-muted-foreground mr-2"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
