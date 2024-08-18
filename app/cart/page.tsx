import PageContainer from "@/src/components/atoms/PageContainer";
import CartList from "@/src/components/organisms/CartList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default function Page() {
  return (
    <PageContainer className="mt-8">
      <header className="text-center">
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
          Your Cart
        </h1>
      </header>

      <CartList />
    </PageContainer>
  );
}
