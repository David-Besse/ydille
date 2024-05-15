"use server";

import { z } from "zod";
import { db } from "../src/lib/db";
import { DishTypeSchema } from "../schemas";
import { currentUserFromServer } from "@/lib/currentUserServerAccess";
import { deleteDishType, getDishType } from "../data/meals";

export const deleteDishTypeAction = async (
  values: z.infer<typeof DishTypeSchema>
) => {
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
  const existingDishType = await getDishType(values.id);
  if (!existingDishType) {
    return { error: "Catégorie introuvable" };
  }

  // Validate values with zod
  const validatedFields = DishTypeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Un problème est survenu" };
  }

  // Delete dishType
  const deletedDishType = await deleteDishType(validatedFields.data.id);
  if (!deletedDishType) {
    return { error: "Un problème est survenu" };
  }

  return { success: "Catégorie supprimée" };
};
