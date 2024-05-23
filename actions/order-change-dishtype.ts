"use server";

import { z } from "zod";
import { db } from "../src/lib/db";
import { OrderChangeDishtypeSchema } from "../schemas";
import { currentUserFromServer } from "@/lib/currentUserServerAccess";
import { updateDishType } from "../data/meals";

export const orderChangeDishtypeAction = async (
  values: z.infer<typeof OrderChangeDishtypeSchema>
) => {
  // Get current user
  const user = await currentUserFromServer();
  if (!user) {
    return { error: "Non autorisé !" };
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
  const validatedFields = OrderChangeDishtypeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Un problème est survenu" };
  }

  // Update order dishTypes
  const updatedDishesAndDishtypes: {
    dishType: {
      id: string;
      name: string;
      order: number;
    };
    dishes: {
      id: string;
      name: string;
      price: number;
      description: string;
    }[];
  }[] = [];

  for (const item of validatedFields.data) {
    const updatedDishType = await updateDishType(item.dishType);
    if (updatedDishType) {
      updatedDishesAndDishtypes.push({ ...item, dishType: updatedDishType });
    }
  }

  if (!updatedDishesAndDishtypes) {
    return { error: "Un problème est survenu" };
  }

  return {
    updatedDishesAndDishtypes: updatedDishesAndDishtypes,
    success: "Ordre des catégories mis à jour !",
  };
};
