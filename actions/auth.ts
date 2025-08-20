"use server";

import { auth } from "@/auth";
import { User } from "@/lib/generated/prisma";
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
// Type du retour
type CreateUserResult = {
  error: boolean;
  message: string;
  data: Omit<User, "password"> | null;
};

export const createUser = async (
  data: NewUserData
): Promise<CreateUserResult> => {
  try {
    // Validation Zod côté serveur
    const validated = signupSchema.safeParse(data);

    if (!validated.success) {
      const errorsM = validated.error.issues
        .map((issue) => issue.message)
        .join(" ");
      return { error: true, message: errorsM, data: null };
    }

    const { email, password, name, phone } = validated.data;

    // Vérification utilisateur existant
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        error: true,
        message: "Un utilisateur avec cet email existe déjà.",
        data: null,
      };
    }

    // Hash du mot de passe
    const hashedPassword = await hash(password, 10);

    // Création utilisateur
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, phone },
    });

    // Retirer le mot de passe pour le retour
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = user;

    return {
      error: false,
      message: `Bienvenue ${rest.name} ! Connectez-vous maintenant!`,
      data: rest,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Erreur createUser:", error);

    // Gestion erreur Prisma spécifique (ex: violation contrainte unique)
    if (error.code === "P2002") {
      return { error: true, message: "Email déjà utilisé", data: null };
    }

    return {
      error: true,
      message:
        "Une erreur s'est produite lors de la création de l'utilisateur.",
      data: null,
    };
  }
};

export const TestCompCount = async () => {
  try {
    const getCount = await prisma.test.findMany();
    const biggestCount =
      getCount.length > 0
        ? getCount.reduce((max, item) => Math.max(max, item.count), 0)
        : 0;

    const count = await prisma.test.create({
      data: {
        count: biggestCount + 1,
      },
    });
    return {
      count,
      message: "Test component count updated successfully.",
      error: false,
    };
  } catch (error) {
    console.log(error);
    return {
      count: null,
      message: "Failed to update test component count.",
      error: true,
    };
  }
};
