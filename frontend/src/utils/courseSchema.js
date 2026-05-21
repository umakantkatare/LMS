import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(5, "Title is required"),

  subtitle: z.string().optional(),

  description: z.string().min(20, "Description must be at least 20 characters"),

  category: z.string().min(1, "Category is required"),

  level: z.string(),

  language: z.string(),

  isFree: z.boolean(),

  price: z.number().optional(),

  discountPrice: z.number().optional(),

  thumbnail: z.any().optional(),

  tags: z.array(
    z.object({
      value: z.string(),
    }),
  ),

  requirements: z.array(
    z.object({
      value: z.string(),
    }),
  ),

  learningOutcomes: z.array(
    z.object({
      value: z.string(),
    }),
  ),
});
