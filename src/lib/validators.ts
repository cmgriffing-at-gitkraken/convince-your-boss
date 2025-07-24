import { z } from "zod";

export const chatRequestSchema = z.object({
    message: z.string().min(1).max(400),
});