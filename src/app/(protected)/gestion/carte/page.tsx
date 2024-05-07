import { db } from "@/lib/db";
import { HandleMeals } from "../../_components/handle-meals";
import { Dish, DishType } from "@prisma/client";

const MealEditPage = async () => {
  // fetch data server-side for the first render
  const dishTypes: DishType[] = await db.dishType.findMany();
  const dishes: Dish[] = await db.dish.findMany();

  return <HandleMeals dishes={dishes} dishTypes={dishTypes} />;
};

export default MealEditPage;
