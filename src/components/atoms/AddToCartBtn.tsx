import { cn } from "@/src/lib/utils";
import { Button } from "./Button";

type AddToCardBtn = {
  className?: string;
  onClick: () => void;
};

export default function AddToCartBtn({ className, onClick }: AddToCardBtn) {
  return (
    <Button
      className={cn(
        "rounded-full border border-input hover:bg-green-900/95 hover:text-white px-8 uppercase",
        className
      )}
      variant="ghost"
      onClick={onClick}
    >
      Add to card
    </Button>
  );
}
