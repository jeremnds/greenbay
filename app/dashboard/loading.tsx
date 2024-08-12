import { LoaderCircle } from "lucide-react";
import MaxWidthWrapper from "../../src/components/ui/MaxWidthWrapper";

export default function Loading() {
  return (
    <MaxWidthWrapper>
      <div className="flex text-green-800 gap-2 mt-16 justify-center h-screen">
        <LoaderCircle className="animate-spin " /> Loading...
      </div>
    </MaxWidthWrapper>
  );
}
