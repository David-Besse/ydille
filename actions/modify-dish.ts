"use server";

import { z } from "zod";
import { db } from "../src/lib/db";
import { DishSchema } from "../schemas";
import { currentUserFromServer } from "@/lib/currentUserServerAccess";
import { getDish, updateDish } from "../data/carte";

export const modifyDish = async (values: z.infer<typeof DishSchema>) => {
  // Get current user
  const user = await currentUserFromServer();
  if (!user) {
    return { error: "Non autorisé" };
  }

  // get user from db
  const dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) {
    return { error: "Utilisateur introuvable" };
  }

  // Check if dish exists
  const existingDish = await getDish(values.id);
  if (!existingDish) {
    return { error: "Plat introuvable" };
  }

  // Validate values with zod
  const validatedFields = DishSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Un problème est survenu" };
  }

  // Update dish
  const updatedDish = await updateDish(validatedFields.data);
  if (!updatedDish) {
    return { error: "Un problème est survenu" };
  }

  return { dish: updatedDish, success: "Plat modifié" };
};
