import { getProducts } from "@/src/queries/getProducts.query";
import Product from "../molecules/Product";

export default async function ProductList() {
  const { products } = await getProducts();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 my-6 gap-8  ">
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
}
