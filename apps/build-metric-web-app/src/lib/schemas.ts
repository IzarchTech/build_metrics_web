import { z } from "zod";

export const rectangularBeamFormSchema = z.object({
  width: z.number().min(0.0000000000001, "Width is required"),
  depth: z.number().min(0.0000000000001, "Depth is required"),
  span: z.number().min(0.0000000000001, "Width is required"),
  quantity: z.number().min(1, "Quantity is required"),
});

export const updateProjectFormSchema = z.object({
  title: z
    .string()
    .min(1, "Project title is required")
    .max(255, "Project title should be less than 255 characters"),
  description: z.string().optional(),
});
