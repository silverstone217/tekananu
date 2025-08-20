"use server";

import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/schema/auth";
import { hash } from "bcryptjs";
import z from "zod";

export const getUser = async () => {
  const session = await auth();

  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// new user
export type NewUserData = z.infer<typeof signupSchema>;
export const createUser = async (data: NewUserData) => {
  try {
    const validated = signupSchema.safeParse(data);

    if (!validated.success) {
      console.log(validated.error.issues, "erreurs survenues");
      const errorsM = validated.error.issues
        .map((issue) => issue.message)
        .join(" ");
      return {
        error: true,
        message: errorsM,
        // errors: validated.error.issues, // Important: Retourner les erreurs Zod
        data: null,
      };
    }

    const { email, password, name, phone } = validated.data;

    const isUserExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserExists) {
      return {
        message: "Un utilisateur avec cet email existe déjà.",
        error: true,
        data: null,
      };
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
      },
    });

    const { password: pass, ...rest } = user;

    await signIn("credentials", {
      email,
      password: pass,
      redirect: false,
    });

    return {
      data: rest,
      error: false,
      message: "Bienvenue" + " " + rest.name + " ! Connectez-vous maintenant!",
    };
  } catch (error) {
    console.log(error);
    return {
      message:
        "Une erreur s'est produite lors de la création de l'utilisateur.",
      error: true,
      data: null,
    };
  }
};
