"use server";

import * as z from "zod";
import { ResetPasswordSchema } from "../schemas";
import { getUserByEmail } from "../data/user";
import { generatePasswordResetToken } from "../src/lib/token";
import { sendResetPasswordEmail } from "../src/lib/mail";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "L'email est invalide !" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email inexistant !" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendResetPasswordEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Email de réinitialisation envoyé !" };
};
