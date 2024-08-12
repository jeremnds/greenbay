import { getProducts } from "@/src/queries/getProducts.query";
import ProductCard from "../molecules/ProductCard";

export default async function ProductList() {
  const { products } = await getProducts();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 my-6 gap-8  ">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
