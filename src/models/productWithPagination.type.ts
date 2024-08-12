import { ProductsType } from "./products.type";

export type ProductsWithPaginationType = {
  products: ProductsType;
  totalPages: number;
  count?: number;
};
