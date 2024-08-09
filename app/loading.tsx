import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex text-green-800 gap-2">
      <LoaderCircle className="animate-spin " /> Loading...
    </div>
  );
}
