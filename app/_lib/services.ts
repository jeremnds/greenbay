import { supabase } from "./supabase";

export async function getProducts() {
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
export async function getProductsWithPagination(page: number, limit: number) {
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

  return { products, count, totalPages: totalPages ?? 0 };
}

export async function getCategories() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id,name");

  if (error) {
    console.error(error);
    throw new Error("Categories could not be loaded");
  }

  return categories;
}

export async function getCategory(id: number) {
  const { data: category, error } = await supabase
    .from("categories")
    .select("name")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Category could not be loaded");
  }

  return category;
}

export async function getUsers() {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return users;
}
