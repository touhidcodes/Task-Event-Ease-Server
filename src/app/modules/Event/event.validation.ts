import { z } from "zod";

const createEventSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Event name is required",
    }),
    date: z.string({
      required_error: "Event date is required",
    }),
    location: z.string({
      required_error: "Event location is required",
    }),
    maxAttendees: z
      .number({
        required_error:
          "Max attendees is required and must be a positive integer",
      })
      .int()
      .min(1),
  }),
});

const updateEventSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    date: z.string().optional(),
    location: z.string().optional(),
    maxAttendees: z.number().int().min(1).optional(),
  }),
});

export const eventValidationSchemas = {
  createEventSchema,
  updateEventSchema,
};
