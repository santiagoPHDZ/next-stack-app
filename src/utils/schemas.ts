
import { z } from "zod";

// Only client side schemas

export const updateUserSchema = z.object({
    firstName: z.string().max(25).min(1).optional(),
    lastName: z.string().max(25).min(1).optional(),
    file: z.instanceof(File).optional(),
})
