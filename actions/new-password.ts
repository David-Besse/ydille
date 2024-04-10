"use server";

import { z } from "zod";
import { NewPasswordSchema } from "../schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "../data/password-reset-token";
import { getUserByEmail, updateUserById } from "../data/user";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Token manquant !" };
  }

  if (!values) {
    return { error: "Veuillez remplir tous les champs" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Le mot de passe est invalide" };
  }
  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Token invalide !" };
  }

  const hasExpired = new Date() > new Date(existingToken.expires);
  if (hasExpired) {
    return { error: "Le token a expiré !" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "L'utilisateur est inexistant" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Mot de passe mis à jour !" };
};
