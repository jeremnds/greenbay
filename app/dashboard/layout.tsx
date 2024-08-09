import { ReactNode } from "react";
import DashboardNavbar from "../_components/ui/DashboardNavbar";
import MaxWidthWrapper from "../_components/ui/MaxWidthWrapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="py-12">
      <div className="grid grid-cols-[4rem_1fr] md:grid-cols-[16rem_1fr] h-full  gap-4 md:gap-12">
        <DashboardNavbar />
        <div className="">{children}</div>
      </div>
    </MaxWidthWrapper>
  );
}
