
import { z } from "zod";

export const updateUserSchema = z.object({
    firstName: z.string().max(25).min(1).optional(),
    lastName: z.string().max(25).min(1).optional(),
    file: z.instanceof(File).optional(),
})

export const updateUserTRPCSchema = {
    firstName: z.string().max(25).min(1).optional(),
    lastName: z.string().max(25).min(1).optional(),
    imageUrl: z.string().optional(),
}
