import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { serverbase } from "~/utils/serverbase";

type CreateContextOptions = Record<string, never>;
const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {
    serverbase
  };
};

export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({});
};

import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
