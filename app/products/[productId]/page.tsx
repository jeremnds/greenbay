import PageContainer from "@/src/components/atoms/PageContainer";
import { ProductParamsType } from "@/src/models/productParams.type";

export default function Page({ params }: ProductParamsType) {
  const { productId } = params;

  return <PageContainer>{productId}</PageContainer>;
}
