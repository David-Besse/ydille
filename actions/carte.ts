"use server";

import { db } from "@/lib/db";

export async function getAllDishTypes() {
  return await db.dishType.findMany();
}

export async function getDishType(id: string) {
  return await db.dishType.findUnique({ where: { id } });
}

export async function createDishType(data: any) {
  return await db.dishType.create({ data });
}

export async function updateDishType(id: string, data: any) {
  return await db.dishType.update({ where: { id }, data });
}

export async function deleteDishType(id: string) {
  return await db.dishType.delete({ where: { id } });
}

export async function getAllDishes() {
  return await db.dish.findMany();
}

export async function getDish(id: string) {
  return await db.dish.findUnique({ where: { id } });
}

export async function createDish(data: any) {
  return await db.dish.create({ data });
}

export async function updateDish(id: string, data: any) {
  return await db.dish.update({ where: { id }, data });
}

export async function deleteDish(id: string) {
  return await db.dish.delete({ where: { id } });
}
