import { db } from "@/lib/db";
import { HandleMeals } from "../../_components/handle-meals";
import { localDishesAndDishTypesList } from "@/store/dish-store";

const MealEditPage = async () => {
  // fetch data server-side for the first render
  const dishesAndDishTypesList = await db.dishType.findMany({
    include: {
      dishToDishType: {
        include: {
          dish: true,
        },
      },
    },
  });

  // normalize data to match the expected format
  const dishTypesAndDishesListFormated: localDishesAndDishTypesList =
    dishesAndDishTypesList.map((dishType) => ({
      dishType: {
        id: dishType.id,
        name: dishType.name,
        order: dishType.order,
      },
      dishes: dishType.dishToDishType.map((dish) => dish.dish),
    }));

  return <HandleMeals data={dishTypesAndDishesListFormated} />;
};

export default MealEditPage;
