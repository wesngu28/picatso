import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import cloudinary from "~/utils/cloudinary";
import { openai } from "~/utils/openAiApi";

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
        // const dalleReturn = await openai.createImage({
        //   prompt: input.generator,
        //   n: 1,
        //   size: "1024x1024"
        // })
        // if (dalleReturn?.data?.data?.[0]?.url) {
        const temp = {url: "https://res.cloudinary.com/du7mimevn/image/upload/v1677383998/opencatvision/avvDB6ZaufpgsKU4CnF_W.png"}
        if(temp) {
          // const aiUrl = dalleReturn.data.data[0].url;
          // const cloudinaryUpload = await cloudinary.uploader.upload(
          //   aiUrl, {
          //     folder: "opencatvision",
          //     public_id: id
          //   }
          // )
          await ctx.serverbase.from("Images").insert({
            ...input,
            url: temp.url,
          } as { generator: string, url: string, user_id: string })
          return temp.url;
        }
      }),

    updateLikes: publicProcedure
      .input(z.object({ generator: z.string(), likers: z.array(z.string()), user: z.string(), likes: z.number() }))
      .mutation(async ({ctx, input}) => {
        if (input.likers.includes(input.user)) {
          const rmuserfromarr = input.likers.filter(user => user !== input.user)
          await ctx.serverbase.from("Images").update({likes: input.likes-1, likers: rmuserfromarr}).eq("generator", input.generator)
          return input.likes - 1
        } else {
          await ctx.serverbase.from("Images").update({likes: input.likes + 1, likers: [...input.likers, input.user]}).eq("generator", input.generator)
          return input.likes + 1
        }
      })
});
