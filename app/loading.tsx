import PageContainer from "@/src/components/atoms/PageContainer";
import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <PageContainer>
      <div className="flex text-green-800 gap-2 items-center justify-center h-screen">
        <LoaderCircle className="animate-spin " /> Loading...
      </div>
    </PageContainer>
  );
}
