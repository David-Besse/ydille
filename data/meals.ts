import { db } from "@/lib/db";
import { Dish, DishType } from "@prisma/client";

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

export async function createDishType(data: { name: string; order: number }) {
  try {
    const dishType = await db.dishType.create({ data });
    return dishType;
  } catch (error) {
    return null;
  }
}

export async function updateDishType(data: {
  id: string;
  name: string;
  order: number;
}) {
  try {
    const updatedDishType = await db.dishType.update({
      where: { id: data.id },
      data: {
        name: data.name,
        order: data.order,
      },
    });
    return updatedDishType;
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

export async function createDish(data: {
  dish: {
    name: string;
    price: number;
    description: string;
  };
  dishType: DishType;
}) {
  try {
    // Create new dish
    const dish = await db.dish.create({ data: { ...data.dish } });

    // Check for existing dishType
    const existingDishType = await db.dishType.findFirst({
      where: {
        id: data.dishType.id,
      },
    });

    // Create a new dish-to-dishtype relationship with existingDishType
    await db.dishDishTypeLink.create({
      data: { dishId: dish.id, dishTypeId: existingDishType?.id },
    });

    const createdDishWithDishType = await db.dish.findUnique({
      where: { id: dish.id },
      include: {
        dishToDishType: {
          include: {
            dishType: {
              select: {
                id: true,
                name: true,
                order: true,
              },
            },
          },
        },
      },
    });

    //if dishType is not created return null
    if (
      !createdDishWithDishType ||
      !createdDishWithDishType.dishToDishType ||
      !createdDishWithDishType.dishToDishType.dishType
    ) {
      return null;
    }

    // return the created dish with his dishType
    return {
      dish: {
        id: createdDishWithDishType.id,
        name: createdDishWithDishType.name,
        price: createdDishWithDishType.price,
        description: createdDishWithDishType.description,
      },
      dishType: {
        id: createdDishWithDishType.dishToDishType.dishType.id,
        name: createdDishWithDishType.dishToDishType.dishType.name,
        order: createdDishWithDishType.dishToDishType.dishType.order,
      },
    };
  } catch (error) {
    return null;
  }
}

export async function updateDish({
  dish,
  dishType,
}: {
  dish: Dish;
  dishType: DishType;
}) {
  try {
    // Check for existing dish-to-dishtype relationship
    const existingRelationship = await db.dishDishTypeLink.findUnique({
      where: { dishId: dish.id },
    });

    // Update or create relationship based on existing relationship
    if (existingRelationship) {
      // Update existing relationship
      await db.dishDishTypeLink.update({
        where: { id: existingRelationship.id },
        data: {
          dishTypeId: dishType.id,
        },
      });
    } else {
      // Create new relationship
      await db.dishDishTypeLink.create({
        data: {
          dishId: dish.id,
          dishTypeId: dishType.id,
        },
      });
    }

    // Update dish
    await db.dish.update({
      where: { id: dish.id },
      data: {
        name: dish.name,
        price: dish.price,
        description: dish.description,
      },
    });

    // Retrieve updated dish with his dish-to-dishtype relationship
    const updatedDish = await db.dish.findUnique({
      where: { id: dish.id },
      include: {
        dishToDishType: {
          select: {
            dishType: {
              select: {
                id: true,
                name: true,
                order: true,
              },
            },
          },
        },
      },
    });

    if (
      !updatedDish ||
      !updatedDish.dishToDishType ||
      !updatedDish.dishToDishType.dishType
    ) {
      return null;
    }

    // Return updated dish
    return {
      dish: {
        id: updatedDish.id,
        name: updatedDish.name,
        price: updatedDish.price,
        description: updatedDish.description,
      },
      dishType: {
        id: updatedDish.dishToDishType.dishType.id,
        name: updatedDish.dishToDishType.dishType.name,
        order: updatedDish.dishToDishType.dishType.order,
      },
    };
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
