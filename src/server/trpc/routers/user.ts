
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({

    // Get current user
    getCurrent: protectedProcedure.query(async ({ ctx }) => {
        console.log(ctx)
        return ctx
    }),
})