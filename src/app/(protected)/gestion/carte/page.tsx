import { db } from "@/lib/db";
import { HandleMeals } from "../../_components/handle-meals";

const MealEditPage = async () => {
  // fetch data server-side for the first render
  const dishTypesAndDishesList = await db.dishType.findMany({
    include: {
      dishToDishType: {
        include: {
          dish: true,
        },
      },
    },
  });

  // normalize data to match the expected format
  const dishTypesAndDishesListFormated = dishTypesAndDishesList.map((dishType) => ({
    dishType: {
      id: dishType.id,
      name: dishType.name,
    },
    dishes: dishType.dishToDishType.map((dish) => dish.dish),
  }));

  return <HandleMeals data={dishTypesAndDishesListFormated} />;
};

export default MealEditPage;
