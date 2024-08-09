import { supabase } from "./supabase";

export async function getProducts() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return products;
}

export async function getCategories() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Categories could not be loaded");
  }

  return categories;
}

export async function getUsers() {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return users;
}
