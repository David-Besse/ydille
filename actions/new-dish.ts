"use server";

import { z } from "zod";
import { db } from "../src/lib/db";
import { CreateDishFormSchema } from "../schemas";
import { currentUserFromServer } from "@/lib/currentUserServerAccess";
import { createDish, getAllDishTypes, getDishType } from "../data/meals";

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

  // get the selected dishType
  const selectedDishType = await getDishType(values.dishTypeId);
  if (!selectedDishType) {
    return {
      error: "un problème est survenu pour récupérer le type de plat",
    };
  }

  const newDish: {
    dish: {
      name: string;
      price: number;
      description: string;
    };
    dishType: {
      id: string;
      name: string;
      order: number;
    };
  } = {
    dish: {
      name: validatedFields.data.name,
      price: validatedFields.data.price,
      description: validatedFields.data.description,
    },
    dishType: {
      id: selectedDishType.id,
      name: selectedDishType.name,
      order: selectedDishType.order,
    },
  };

  // Create new dish in database
  const createdDishWithDishType = await createDish(newDish);

  if (!createdDishWithDishType) {
    return { error: "Échec de la création du plat" };
  }
  return { createdDishWithDishType: createdDishWithDishType, success: "Plat créé avec succès" };
};
