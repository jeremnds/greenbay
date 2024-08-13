import { supabase } from "../lib/supabase";
import { UserType } from "../models/user.type";

export async function createUser(newUser: UserType) {
  const { error } = await supabase.from("users").insert([newUser]);

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }
}
