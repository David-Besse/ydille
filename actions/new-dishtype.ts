"use server";

import { z } from "zod";
import { db } from "../src/lib/db";
import { CreateDishTypeSchema } from "../schemas";
import { currentUserFromServer } from "@/lib/currentUserServerAccess";
import { createDishType, getDishTypeByName } from "../data/meals";

export const newDishType = async (
  values: z.infer<typeof CreateDishTypeSchema>
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

  // Check if dishType already exists
  const existingDishType = await getDishTypeByName(values.name);
  if (existingDishType) {
    return { error: "La catégorie existe déja !" };
  }

  // Validate values with zod
  const validatedFields = CreateDishTypeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Un problème est survenu" };
  }

  // Create new dishType
  const createdDishType = await createDishType({
    name: validatedFields.data.name,
  });
  if (!createdDishType) {
    return { error: "Un problème est survenu" };
  }

  return { data: createdDishType, success: "Nouvelle catégorie ajoutée !" };
};
