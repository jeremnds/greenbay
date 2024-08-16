import { cn } from "@/src/lib/utils";
import { LoaderCircle } from "lucide-react";

type SpinnerProps = {
  className?: string;
};

export default function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "flex gap-2 items-center justify-center text-green-800 ",
        className
      )}
    >
      <LoaderCircle className="animate-spin " />
    </div>
  );
}
