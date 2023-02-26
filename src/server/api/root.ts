import { createTRPCRouter } from "~/server/api/trpc";
import { imagesRouter } from "~/server/api/routers/images";

export const appRouter = createTRPCRouter({
  images: imagesRouter,
});

export type AppRouter = typeof appRouter;
