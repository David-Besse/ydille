"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { ProfilSchema } from "../schemas";
import { getUserByEmail, getUserById } from "../data/user";
import { currentUserFromServer } from "@/lib/currentUserServerAccess";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof ProfilSchema>) => {
  // Get current user
  const user = await currentUserFromServer();

  // Check if no user, return error
  if (!user) {
    return { error: "Non autorisé" };
  }

  // get user from db
  const dbUser = await getUserById(user.id as string);

  // if user not found, return error
  if (!dbUser) {
    return { error: "Utilisateur introuvable" };
  }

  // Check if user is OAuth and if so, we want to update email / password / new password / isTwoFactorEnabled
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // Check if email is different
  if (values.email && values.email !== user.email) {
    // Check if user already exists
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email déjà utilisé !" };
    }

    // if email is different, generate verification token for new email
    const verificationToken = await generateVerificationToken(values.email);

    // send verification email
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    // return success
    return { success: "Email de confirmation envoyé !" };
  }

  // If name or email or password or new password is empty, set it to undefined
  if (values.name === "") values.name = undefined;
  if (values.email === "") values.email = undefined;
  if (values.password === "") values.password = undefined;
  if (values.newPassword === "") values.newPassword = undefined;

  // Hash password
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    // Check if password is different
    if (!passwordMatch) {
      return { error: "Mot de passe incorrect !" };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  // Update user
  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "Modifications sauvegardées" };
};
