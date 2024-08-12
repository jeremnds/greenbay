import { CategoriesType } from "./categories.type";

export type CategoriesWithPaginationType = {
  categories: CategoriesType;
  totalPages: number;
  count?: number;
};
