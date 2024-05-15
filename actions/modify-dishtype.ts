"use server";

import { z } from "zod";
import { db } from "../src/lib/db";
import { ModifyDishTypeFormSchema } from "../schemas";
import { currentUserFromServer } from "@/lib/currentUserServerAccess";
import {
  createDishType,
  getDishTypeByName,
  updateDishType,
} from "../data/meals";

export const modifyDishTypeAction = async (
  values: z.infer<typeof ModifyDishTypeFormSchema>
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
  const validatedFields = ModifyDishTypeFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Un problème est survenu" };
  }

  // Update dishType
  const updatedDishType = await updateDishType(validatedFields.data);
  if (!updatedDishType) {
    return { error: "Un problème est survenu" };
  }

  return { updatedDishType: updatedDishType, success: "Catégorie modifiée !" };
};
