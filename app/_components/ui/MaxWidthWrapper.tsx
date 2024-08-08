import { ReactNode } from "react";
import { cn } from "../../_lib/utils";

type MaxWidthWrapperProps = {
  children: ReactNode;
  className?: string;
};

export default function MaxWidthWrapper({
  children,
  className,
}: MaxWidthWrapperProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px2.5 md:px-20", className)}
    >
      {children}
    </div>
  );
}
