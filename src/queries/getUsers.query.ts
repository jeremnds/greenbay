import { supabaseServer } from "../lib/supabaseServer";
import { UsersType } from "../models/users.type";

export async function getUsers(): Promise<UsersType> {
  const { data: users, error } = await supabaseServer
    .from("users")
    .select("id, email, name, role");

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return users;
}
