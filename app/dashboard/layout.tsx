import PageContainer from "@/src/components/atoms/PageContainer";
import DashboardNavbar from "@/src/components/organisms/DashboardNavbar";
import { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Dashboard",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <PageContainer className="py-12">
      <div className="grid grid-cols-[4rem_1fr] md:grid-cols-[16rem_1fr] h-full  gap-4 md:gap-12">
        <DashboardNavbar />
        <div className="">{children}</div>
      </div>
      <Toaster />
    </PageContainer>
  );
}
