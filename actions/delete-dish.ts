"use server";

import { z } from "zod";
import { db } from "../src/lib/db";
import { DishAndDishTypeSchema } from "../schemas";
import { currentUserFromServer } from "@/lib/currentUserServerAccess";
import { getDish, deleteDish } from "../data/meals";

export const deleteDishAction = async (values: z.infer<typeof DishAndDishTypeSchema>) => {
  // Get current user
  const user = await currentUserFromServer();
  if (!user) {
    return { error: "Non autorisé" };
  }

  // check if user is in database
  const dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) {
    return { error: "Utilisateur introuvable, veuillez vous connecter" };
  }

  // Check if dish exists
  const existingDish = await getDish(values.dish.id);
  if (!existingDish) {
    return { error: "Plat introuvable" };
  }

  // Validate values with zod
  const validatedFields = DishAndDishTypeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Un problème est survenu" };
  }

  // Delete dish
  const deletedDish = await deleteDish(validatedFields.data.dish.id);
  if (!deletedDish) {
    return { error: "Un problème est survenu" };
  }

  return { success: "Plat supprimé" };
};
