import { db } from "@/lib/db";
import { HandleMeals } from "../../_components/handle-meals";
import { Dish } from "@prisma/client";

type DishTypeAndDishes = {
  id: string;
  name: string;
  dishes: Dish[];
};

const MealEditPage = async () => {
 // fetch data server-side for the first render
 const getDishTypesAndDishes = await db.dishType.findMany({
  include: {
    dishes: {
      include: {
        dish: true,
      },
    },
  },
});

const dishTypesAndDishes: DishTypeAndDishes[] = getDishTypesAndDishes.map((dishType) => ({
  id: dishType.id,
  name: dishType.name,
  dishes: dishType.dishes.map((dish) => dish.dish),
}));

  return <HandleMeals data={dishTypesAndDishes} />;
};

export default MealEditPage;
