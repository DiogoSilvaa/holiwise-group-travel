import { z } from "zod";

export const formSchema = z
  .object({
    destinationId: z.string().optional(),
    anywhere: z.boolean().default(false),
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
          (data.start && data.end && data.start < data.end),
        "Start date must be before end"
      ),
  })
  .superRefine((data, ctx) => {
    if (!data.anywhere && !data.destinationId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["destination"],
        message: "Destination is required when 'Not decided yet' is off",
      });
    }
  });
