import { sanitizeFileName } from "@/src/lib/utils";
import { randomUUID } from "crypto";
import { SUPABASE_STORAGE } from "../lib/constants";
import { supabaseServer } from "../lib/supabaseServer";

export async function uploadImage(file: File, prefix: string) {
  const uuid = randomUUID();
  const sanitizedFileName = sanitizeFileName(file.name);
  const fileName = `${prefix}-${uuid}-${sanitizedFileName}`;

  const { error } = await supabaseServer.storage
    .from("images")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    throw new Error("Image could not be uploaded");
  }

  return `${SUPABASE_STORAGE}${fileName}`;
}
