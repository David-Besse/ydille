import { db } from "@/lib/db";
import HandleCarte from "../../_components/handle-carte";
import { Dish, DishType } from "@prisma/client";

const MealEditPage = async () => {
  const dishTypes: DishType[] = await db.dishType.findMany();
  const dishes: Dish[] = await db.dish.findMany();

  return <HandleCarte dishes={dishes} dishTypes={dishTypes} />;
};

export default MealEditPage;
