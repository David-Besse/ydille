"use server";

import { z } from "zod";
import { db } from "../src/lib/db";
import { DishTypeSchema } from "../schemas";
import { currentUserFromServer } from "@/lib/currentUserServerAccess";
import { createDishType, getDish, getDishType, updateDish } from "../data/carte";

export const newDishType = async (values: z.infer<typeof DishTypeSchema>) => {
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
    return { error: "Utilisateur introuvable !" };
  }

  // Check if dishType already exists
  const existingDishType = await getDishType(values.id);
  if (existingDishType) {
    return { error: "La catégorie existe déja !" };
  }

  // Validate values with zod
  const validatedFields = DishTypeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Un problème est survenu" };
  }

  // Create new dishType
  const createdNewDishType = await createDishType(
    validatedFields.data
  );
  if (!createdNewDishType) {
    return { error: "Un problème est survenu" };
  }

  return { success: "Nouvelle catégorie ajoutée !" };
};
