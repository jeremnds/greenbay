import PageContainer from "@/src/components/atoms/PageContainer";
import Product from "@/src/components/organisms/Product";
import { ProductParamsType } from "@/src/models/productParams.type";
import { getProduct } from "@/src/queries/getProduct.query";

export default async function Page({ params }: ProductParamsType) {
  const { productId } = params;

  const product = await getProduct(productId);

  return (
    <PageContainer className="my-10">
      <Product product={product} />
    </PageContainer>
  );
}
