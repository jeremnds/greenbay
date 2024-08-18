import PageContainer from "@/src/components/atoms/PageContainer";
import Product from "@/src/components/organisms/Product";
import { auth } from "@/src/lib/auth";
import { ProductParamsType } from "@/src/models/productParams.type";
import { getCategory } from "@/src/queries/getCategory.query";
import { getProduct } from "@/src/queries/getProduct.query";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: ProductParamsType): Promise<Metadata> {
  const product = await getProduct(params.productId);

  return {
    title: `${product.name}`,
  };
}

export default async function Page({ params }: ProductParamsType) {
  const { productId } = params;

  const product = await getProduct(productId);

  const [session, category] = await Promise.all([
    auth(),
    getCategory(product.category_id),
  ]);

  return (
    <PageContainer className="my-10">
      <Product product={product} session={session} category={category} />
    </PageContainer>
  );
}
