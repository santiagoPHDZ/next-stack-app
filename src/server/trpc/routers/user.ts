
import { updateUserTRPCSchema } from "@/lib/schemas";
import { db } from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { getUser } from "@/server/services/user";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
    // update: protectedProcedure.input(updateUserTRPCSchema).mutation(async ({ input, ctx }) => {

    //     const { userId } = ctx
    //     const { firstName, lastName, imageUrl } = input

    //     const updated = await db.user.update({
    //         where: {
    //             id: userId
    //         },
    //         data: {
    //             firstName: firstName === undefined ? undefined : firstName,
    //             lastName: lastName === undefined ? undefined : lastName,
    //             imageUrl: imageUrl === undefined ? undefined : imageUrl,
    //         }
    //     })

    //     return updated
    // }),

    getCurrent: publicProcedure
        .query(async ({ input }) => {
            return await getUser()
        }),
    postCurrent: publicProcedure
        .mutation(async ({ input }) => {
            console.log("Toggled")
            return "hi"
        }),
})