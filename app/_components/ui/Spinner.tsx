import { LoaderCircle } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex text-green-800 gap-2 items-center justify-center">
      <LoaderCircle className="animate-spin " /> Loading...
    </div>
  );
}
