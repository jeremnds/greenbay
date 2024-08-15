"use server";

import { uploadImage } from "@/src/queries/uploadImage.query";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "./auth";
import { supabaseServer } from "./supabaseServer";

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProductAction(formData: FormData, id: number) {
  // const session = await auth();
  // if (!session) throw new Error("You must be logged in");

  const name = formData.get("name");
  const description = formData.get("description");
  const price = Number(formData.get("price"));
  const category_id = Number(formData.get("category_id"));
  const available = formData.get("available");
  const image = formData.get("image");

  let imageUrl = null;
  if (image && typeof image !== "string") {
    imageUrl = await uploadImage(image, "product");
  }

  const updatedProduct = {
    name,
    description,
    price,
    category_id,
    available,
    ...(imageUrl && { image: imageUrl }),
  };

  const { error } = await supabaseServer
    .from("products")
    .update(updatedProduct)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Product could not be updated");

  revalidatePath("/dashboard/products/", "layout");

  redirect("/dashboard/products");
}

export async function createProductAction(formData: FormData) {
  // const session = await auth();
  // if (!session) throw new Error("You must be logged in");

  const name = formData.get("name");
  const description = formData.get("description");
  const price = Number(formData.get("price"));
  const category_id = Number(formData.get("category_id"));
  const available = formData.get("available");
  const image = formData.get("image");

  let imageUrl = null;
  if (image && typeof image !== "string") {
    imageUrl = await uploadImage(image, "product");
  }

  const newProduct = {
    name,
    description,
    price,
    category_id,
    available,
    ...(imageUrl && { image: imageUrl }),
  };

  const { error } = await supabaseServer.from("products").insert([newProduct]);

  if (error) throw new Error("Product could not be created");

  revalidatePath("/dashboard/", "layout");

  redirect("/dashboard/products");
}

export async function deleteProductAction(id: number) {
  const { error } = await supabaseServer.from("products").delete().eq("id", id);

  if (error) throw new Error("Product could not be created");

  revalidatePath("/dashboard/", "layout");

  redirect("/dashboard/products");
}

export async function updateCategoryAction(formData: FormData, id: number) {
  // const session = await auth();
  // if (!session) throw new Error("You must be logged in");

  const name = formData.get("name");
  const image = formData.get("image");

  let imageUrl = null;
  if (image && typeof image !== "string") {
    imageUrl = await uploadImage(image, "category");
  }

  const updatedCategory = {
    name,
    ...(imageUrl && { image: imageUrl }),
  };

  const { error } = await supabaseServer
    .from("categories")
    .update(updatedCategory)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Category could not be updated");

  revalidatePath("/dashboard/categories/", "layout");

  redirect("/dashboard/categories");
}

export async function createCategoryAction(formData: FormData) {
  // const session = await auth();
  // if (!session) throw new Error("You must be logged in");

  const name = formData.get("name");
  const image = formData.get("image");

  let imageUrl = null;
  if (image && typeof image !== "string") {
    imageUrl = await uploadImage(image, "product");
  }

  const newCategory = {
    name,
    ...(imageUrl && { image: imageUrl }),
  };

  const { error } = await supabaseServer
    .from("categories")
    .insert([newCategory]);

  if (error) throw new Error("Product could not be created");

  revalidatePath("/dashboard/", "layout");

  redirect("/dashboard/categories");
}

export async function deleteCategoryAction(id: number) {
  const { error } = await supabaseServer
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw new Error("Category could not be created");

  revalidatePath("/dashboard/", "layout");

  redirect("/dashboard/categories");
}
