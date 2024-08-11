import { z } from "zod";
import { CategorySchema, ProductSchema } from "./schemas";

export type OnUploadImageType = (value: File | null) => void;

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
  available: boolean;
};

export type ProductsType = ProductType[];

export type ProductsWithPaginationType = {
  products: ProductsType;
  totalPages: number;
  count?: number;
};

export type UpdatedProductType = {
  name: string;
  description: string;
  price: number;
  category_id: number;
  image?: File; // Optional image property
};

export type ProductFormData = z.infer<typeof ProductSchema>;

export type CategoryFormData = z.infer<typeof CategorySchema>;

export type CategoryNameType = {
  name: string;
};

export type CategoryType = {
  id: number;
  name: string;
  image?: string;
};

export type CategoriesType = CategoryType[];

export type CategoriesWithPaginationType = {
  categories: CategoriesType;
  totalPages: number;
  count?: number;
};

export type UserType = {
  id: number;
  email: string;
  name: string;
  role: "admin" | "customer";
};

export type UsersType = UserType[];
