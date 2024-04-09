"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../schemas";
import { createUser, getUserByEmail } from "../data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // Parse values using zod
  const validatedFields = RegisterSchema.safeParse(values);

  // If values are not valid, return error
  if (!validatedFields.success) {
    return { error: "Un problème est survenu" };
  }

  // If values are valid, destructure them
  const { name, email, password } = validatedFields.data;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user already exists
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email déjà utilisé !" };
  }

  // If user does not exist, create user
  const newUser = await createUser(name, email, hashedPassword);

  // TODO: Send verification token to user

  return { success: "Compte créé" };
};
