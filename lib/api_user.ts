import { Database } from "../db_types";
import { supabase } from "./supabase";



export const downloadAvatar = async (path: string): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);
    if (error) throw error;
    const fr = new FileReader();
    fr.readAsDataURL(data);
    return new Promise((resolve) => {
      fr.onload = () => {
        resolve(fr.result as string);
      };
    });
  } catch (err) {
    console.log("error", err);
    return "";
  }
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];



export const fetchContacts = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("username, avatar_url, id")
    .neq("id", userId);
  if (error) {
    console.log("error", error);
    return [];
  } else {
    return data;
  }
};

export type Contacts = Awaited<ReturnType<typeof fetchContacts>>;
export type Contact = Contacts[number];



