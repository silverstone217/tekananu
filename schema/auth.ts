import z from "zod";

export const signupSchema = z.object({
  email: z
    .email({
      error: "L'email est obligatoire et doit avoir un @ et un domaine",
    })
    .max(60),
  password: z.string().min(6).max(12),
  name: z.string().min(6).max(50),
  phone: z
    .string()
    .min(9, {
      error: "Le numero de téléphone doit contenir 9 chiffres.",
    })
    .max(9, {
      error: "Le numero de téléphone doit contenir 9 chiffres.",
    }),
});

export const loginSchema = z.object({
  email: z
    .email({
      error: "L'email est obligatoire et doit avoir un @ et un domaine",
    })
    .max(60),
  password: z.string().min(6).max(12),
});
