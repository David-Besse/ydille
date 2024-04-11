"use server";
import { db } from "../lib/db";
import { getUserByEmail, updateUserById } from "../data/user";
import { getVerificationTokenByToken } from "../data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Le token est inexistant" };
  }

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return { error: "Le token a expiré" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "L'utilisateur est inexistant" };
  }

  await updateUserById(existingUser.id, {
    emailVerified: new Date(),
    email: existingToken.email,
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email vérifié !" };
};
