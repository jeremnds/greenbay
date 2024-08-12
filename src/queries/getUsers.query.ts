import { supabase } from "../lib/supabase";
import { UsersType } from "../models/users.type";

export async function getUsers(): Promise<UsersType> {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return users;
}
