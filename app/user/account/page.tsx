import PageContainer from "@/src/components/atoms/PageContainer";
import OrderTable from "@/src/components/organisms/OrderTable";
import { auth } from "@/src/lib/auth";
import { getOrdersByUserId } from "@/src/queries/getOrders.query";

export const revalidate = 0;

export default async function Page() {
  const session = await auth();
  const firstName = session?.user?.name.split(" ")[0];
  const customerId = session?.user?.customerId;

  const { orders } = await getOrdersByUserId(customerId);
  return (
    <PageContainer className="mt-8">
      <h4 className="text-center text-xl">
        Hello <span className="text-green-800 font-medium">{firstName}</span> 👋
      </h4>
      <div className="mt-8">
        {orders && orders.length > 0 ? (
          <OrderTable orders={orders} customerId={customerId} />
        ) : (
          <h4 className="text-center text-green-800 text-xl">
            You don&apos;t have any orders yet.
          </h4>
        )}
      </div>
    </PageContainer>
  );
}
