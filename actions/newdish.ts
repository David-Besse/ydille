"use server";

import { z } from "zod";
import { db } from "../src/lib/db";
import { CreateDishFormSchema } from "../schemas";
import { currentUserFromServer } from "@/lib/currentUserServerAccess";
import { createDish, getDishTypeByName } from "../data/meals";

export const newDishAction = async (
  values: z.infer<typeof CreateDishFormSchema>
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
    return { error: "Utilisateur introuvable, veuillez vous connecter" };
  }

  // Validate values with zod
  const validatedFields = CreateDishFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Un problème est survenu" };
  }

  // get the dishType default
  const dishType = await getDishTypeByName("stock");

  if (!dishType) {
    return {
      error:
        "Un problème est survenu (impossible d'accéder à la catégorie par défaut)",
    };
  }

  // Update dish
  const updatedDish = await createDish({
    dish: {
      name: validatedFields.data.name,
      price: validatedFields.data.price,
      description: validatedFields.data.description,
    },
    dishType: dishType,
  });
  if (!updatedDish) {
    return { error: "Un problème est survenu" };
  }

  return { updatedDish: updatedDish, success: "Plat modifié" };
};
