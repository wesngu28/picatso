import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import cloudinary from "~/utils/cloudinary";

export const imagesRouter = createTRPCRouter({
    getAll: publicProcedure
      .query(async ({ ctx }) => {
        const images: PostgrestSingleResponse<{ generator: string, url: string, user_id: string }[]> = await ctx.serverbase
          .from("Images")
          .select()
        return images
    }),

    addImage: publicProcedure
      .input(z.object({ generator: z.string(), user_id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const id = nanoid()
        const dalleReturn = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rengar_0.jpg"
        const test = await cloudinary.uploader.upload(
          dalleReturn, {
            folder: "opencatvision",
            public_id: id
          }
        )
        await ctx.serverbase.from("Images").insert({
          ...input,
          url: test.url,
        } as { generator: string, url: string, user_id: string })
        return test.url;
      }),

    updateLikes: publicProcedure
      .input(z.object({ generator: z.string(), likers: z.array(z.string()), user: z.string(), likes: z.number() }))
      .mutation(async ({ctx, input}) => {
        if (input.likers.includes(input.user)) {
          const rmuserfromarr = input.likers.filter(user => user !== input.user)
          await ctx.serverbase.from("Images").update({likes: input.likes - 1, likers: rmuserfromarr}).eq("generator", input.generator)
        } else {
          await ctx.serverbase.from("Images").update({likes: input.likes + 1, likers: [...input.likers, input.user]}).eq("generator", input.generator)
        }
      })
});
