
import { updateUserTRPCSchema } from "@/lib/schemas";
import { db } from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    update: protectedProcedure.input(updateUserTRPCSchema).mutation(async ({ input, ctx }) => {

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
    })
})