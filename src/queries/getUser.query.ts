import { supabase } from "../lib/supabase";
import { UserType } from "../models/user.type";

export async function getUser(email: string): Promise<UserType | null> {
  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, name, role")
    .eq("email", email)
    .maybeSingle();

  return user;
}
