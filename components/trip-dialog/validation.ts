import { z } from "zod";

export const tripSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
  destinationId: z.string().nullable(),
});
