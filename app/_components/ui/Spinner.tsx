import { LoaderCircle } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex gap-2 items-center justify-center text-green-800 ">
      <LoaderCircle className="animate-spin " />
    </div>
  );
}
