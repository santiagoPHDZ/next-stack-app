
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input, ctx }) => {

            return {
                greeting: `Hello ${input.text}`,
            };
        }),
})