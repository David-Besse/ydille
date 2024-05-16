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

export async function createDishType(data: any) {
  try {
    const dishType = await db.dishType.create({ data });
    return dishType;
  } catch (error) {
    return null;
  }
}

export async function updateDishType(data: any) {
  try {
    const updatedDishType = await db.dishType.update({
      where: { id: data.id },
      data: {
        name: data.name,
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
  dishType: {
    id: string;
    name: string;
  };
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

    // If not, create a new dishtype named "stock" and create a new dish-to-dishtype relationship
    if (!existingDishType) {
      // create a new dishtype named "stock" (default)
      const newDishType = await db.dishType.create({
        data: {
          name: "stock",
        },
      });

      // Create a new dish-to-dishType relationship with newDishType
      await db.dishDishTypeLink.create({
        data: { dishId: dish.id, dishTypeId: newDishType.id },
      });
    } else {
      // If yes, create a new dish-to-dishtype relationship with existingDishType
      await db.dishDishTypeLink.create({
        data: { dishId: dish.id, dishTypeId: existingDishType.id },
      });
    }

    const newDishWithDishType = await db.dish.findUnique({
      where: { id: dish.id },
      include: {
        dishToDishType: {
          include: {
            dishType: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (
      !newDishWithDishType ||
      !newDishWithDishType.dishToDishType ||
      !newDishWithDishType.dishToDishType.dishType
    ) {
      return null;
    }

    return {
      dish: {
        id: newDishWithDishType.id,
        name: newDishWithDishType.name,
        price: newDishWithDishType.price,
        description: newDishWithDishType.description,
      },
      dishType: {
        id: newDishWithDishType.dishToDishType.dishType.id,
        name: newDishWithDishType.dishToDishType.dishType.name,
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
      dishType: updatedDish.dishToDishType.dishType,
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