import { z } from "zod";

export const formSchema = z.object({
  name: z.string(),
  destinationId: z.string().nullable(),
  date: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional()
    .refine(
      (data) =>
        !data?.start ||
        !data?.end ||
        (data.start && data.end && data.start < data.end)
    ),
});
