"use server";

import { z } from "zod";
import { db } from "../src/lib/db";
import { DishAndDishTypeSchema } from "../schemas";
import { currentUserFromServer } from "@/lib/currentUserServerAccess";
import { getDish, updateDish } from "../data/meals";

export const modifyDishAction = async (
  values: z.infer<typeof DishAndDishTypeSchema>
) => {
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
    return { error: "Utilisateur introuvable, veuillez vous reconnecter" };
  }

  // Check if dish exists
  const existingDish = await getDish(values.dish.id);
  if (!existingDish) {
    return { error: "Plat introuvable" };
  }

  // Validate values with zod
  const validatedFields = DishAndDishTypeSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Un problème est survenu pendant la vérification des données",
    };
  }

  // Update dish
  const updatedDish = await updateDish(validatedFields.data);
  if (!updatedDish) {
    console.log(updateDish);
    return { error: "Un problème est survenu lors de la mise à jour du plat" };
  }

  return { updatedDish: updatedDish, success: "Plat modifié" };
};
