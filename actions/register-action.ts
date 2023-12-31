"use server";

import { registerSchema } from "@/schemas";
import * as z from "zod";

export const Register = async (values: z.infer<typeof registerSchema>) => {
  console.log(values);
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };
};
