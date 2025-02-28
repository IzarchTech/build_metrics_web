import { z } from "zod";

export const rectangularBeamFormSchema = z.object({
  width: z.number().min(0.0000000000001, "Width is required"),
  depth: z.number().min(0.0000000000001, "Depth is required"),
  span: z.number().min(0.0000000000001, "Width is required"),
});
