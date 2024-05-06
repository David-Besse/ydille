import { db } from "@/lib/db";

export async function getAllDishTypes() {
  try {
    const dishTypes = await db.dishType.findMany();
    return dishTypes;
  } catch (error) {
    return null;
  }
}

export async function getDishType(id: string) {
  try {
    const dishType = await db.dishType.findUnique({ where: { id } });
    return dishType;
  } catch (error) {
    return null;
  }
}

export async function createDishType(data: any) {
  try {
    const dishType = await db.dishType.create({ data });
    return dishType;
  } catch (error) {
    return null;
  }
}

export async function updateDishType(id: string, data: any) {
  try {
    const dishType = await db.dishType.update({ where: { id }, data });
    return dishType;
  } catch (error) {
    return null;
  }
}

export async function deleteDishType(id: string) {
  try {
    const dishType = await db.dishType.delete({ where: { id } });
    return dishType;
  } catch (error) {
    return null;
  }
}

export async function getAllDishes() {
  try {
    const dishes = await db.dish.findMany();
    return dishes;
  } catch (error) {
    return null;
  }
}

export async function getDish(id: string) {
  try {
    const dish = await db.dish.findUnique({ where: { id } });
    return dish;
  } catch (error) {
    return null;
  }
}

export async function createDish(data: any) {
  try {
    const dish = await db.dish.create({ data });
    return dish;
  } catch (error) {
    return null;
  }
}

export async function updateDish(id: string, data: any) {
  try {
    const dish = await db.dish.update({ where: { id }, data });
    return dish;
  } catch (error) {
    return null;
  }
}

export async function deleteDish(id: string) {
  try {
    const dish = await db.dish.delete({ where: { id } });
    return dish;
  } catch (error) {
    return null;
  }
}
