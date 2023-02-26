import type { UserProfile } from "@auth0/nextjs-auth0/client";
import { supabase } from "./supabase";

export async function getAllImages(
  user: UserProfile | undefined,
  equator: boolean,
  setter: (arr: imageEntry[]) => void
) {
  try {
    if (!user || !user.nickname) return;
    const { data: images } = equator
      ? await supabase.from("Images").select().eq("user_id", user.nickname)
      : await supabase.from("Images").select();
    if (images) {
      const imageArr = images.map((image) => image as imageEntry);
      setter(imageArr)
    }
  } catch (err) {
    console.error("Error happened while getting images: ", err);
  }
}
