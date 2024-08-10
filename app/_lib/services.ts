import { randomUUID } from "crypto";
import {
  CategoriesType,
  CategoryType,
  ProductsType,
  ProductsWithPaginationType,
  ProductType,
  UsersType,
} from "../_models/types";
import { supabase } from "./supabase";

const SUPABASE_STORAGE =
  "https://kowwjfqvfqxwztgasfiq.supabase.co/storage/v1/object/public/images/";

export async function getProducts(): Promise<ProductsType> {
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, description, price, image, category_id, available")
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return products;
}

export async function getProductsWithPagination(
  page: number,
  limit: number
): Promise<ProductsWithPaginationType> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit - 1;

  const {
    data: products,
    count,
    error,
  } = await supabase
    .from("products")
    .select("id, name, description, price, image, category_id, available", {
      count: "exact",
    })
    .order("id")
    .range(startIndex, endIndex);

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  let totalPages;
  if (count) totalPages = Math.ceil(count / limit);

  return { products, count: count ?? 0, totalPages: totalPages ?? 0 };
}

export async function getProduct(id: number): Promise<ProductType> {
  const { data: product, error } = await supabase
    .from("products")
    .select("name, image, id, description, price, category_id, available")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
  }

  return product;
}

export async function getCategories(): Promise<CategoriesType> {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id,name");

  if (error) {
    console.error(error);
    throw new Error("Categories could not be loaded");
  }

  return categories;
}

export async function getCategory(id: number): Promise<CategoryType> {
  const { data: category, error } = await supabase
    .from("categories")
    .select("name, image, id")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Category could not be loaded");
  }

  return category;
}

export async function getUsers(): Promise<UsersType> {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return users;
}

export async function uploadImage(file: File, prefix: string) {
  const uuid = randomUUID();
  const fileName = `${prefix}-${uuid}-${file.name}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    throw new Error("Image could not be uploaded");
  }

  return `${SUPABASE_STORAGE}${fileName}`;
}
