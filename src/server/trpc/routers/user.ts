
import { getUser } from "@/server/services/user";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    getCurrent: publicProcedure
        .query(async ({ input }) => {
            return await getUser()
        }),
})
