import { db } from "@/lib/db";
import { Dish, DishDishTypeLink } from "@prisma/client";

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

export async function getDishTypeByName(name: string) {
  try {
    const dishType = await db.dishType.findFirst({ where: { name: name } });
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
    await db.dishDishTypeLink.deleteMany({
      where: { dishTypeId: id },
    });
    await db.dishType.delete({ where: { id } });
    return true;
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

export async function updateDish(data: Dish & { dishTypeId: string }) {
  try {
    // Check for existing dish-to-dishtype relationship
    const existingRelationship: DishDishTypeLink | null =
      await db.dishDishTypeLink.findUnique({
        where: { dishId: data.id },
      });

    // Update or create relationship based on existing relationship
    if (existingRelationship) {
      // Update existing relationship
      await db.dishDishTypeLink.update({
        where: { id: existingRelationship.id },
        data: {
          dishTypeId: data.dishTypeId,
        },
      });
    } else {
      // Create new relationship
      await db.dishDishTypeLink.create({
        data: {
          dishId: data.id,
          dishTypeId: data.dishTypeId,
        },
      });
    }

    // Update dish
    await db.dish.update({
      where: { id: data.id },
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
      },
    });

    // Retrieve updated dish
    const updatedDish = await db.dish.findUnique({
      where: { id: data.id },
      include: {
        dishToDishType: {
          select: {
            dishTypeId: true,
          },
        },
      },
    });

    return updatedDish;
  } catch (error) {
    return null;
  }
}

// delete a dish and all its relationships
export async function deleteDish(id: string) {
  try {
    await db.dishDishTypeLink.delete({ where: { dishId: id } });
    await db.dish.delete({ where: { id } });
    return true;
  } catch (error) {
    return null;
  }
}
