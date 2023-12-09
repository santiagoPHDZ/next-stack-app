
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { getUser } from "@/server/services/user";
import { db } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
    update: protectedProcedure.input(z.object({
        firstName: z.string().max(25).min(1).optional(),
        lastName: z.string().max(25).min(1).optional(),
        imageUrl: z.string().optional(),
    })).mutation(async ({ input, ctx }) => {

        try {

            const { userId } = ctx
            const { firstName, lastName, imageUrl } = input

            const updated = await db.user.update({
                where: {
                    id: userId
                },
                data: {
                    firstName: firstName === undefined ? undefined : firstName,
                    lastName: lastName === undefined ? undefined : lastName,
                    imageUrl: imageUrl === undefined ? undefined : imageUrl,
                }
            })

            return updated
        } catch (error) {
            throw new TRPCError({ code: "BAD_REQUEST" })
        }
    }),

    getCurrent: publicProcedure
        .query(async ({ input }) => {
            return await getUser()
        }),
})