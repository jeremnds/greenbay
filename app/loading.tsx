import { LoaderCircle } from "lucide-react";
import MaxWidthWrapper from "./_components/ui/MaxWidthWrapper";

export default function Loading() {
  return (
    <MaxWidthWrapper>
      <div className="flex text-green-800 gap-2 items-center justify-center h-screen">
        <LoaderCircle className="animate-spin " /> Loading...
      </div>
    </MaxWidthWrapper>
  );
}
