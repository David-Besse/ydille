import { Dish, DishType, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v4 as uuidv4 } from "uuid";

const dishList: Dish[] = [
  {
    name: "Planchette de charcuterie",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a elementum diam. Curabitur dignissim pellentesque auctor. Fusce et ligula congue, porttitor enim nec, iaculis ante. Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. Pellentesque a laoreet urna. Maecenas id elit ex. Fusce pellentesque magna eu nulla molestie dignissim",
    price: 15,
    dishTypeId: "",
    id: "",
  },
  {
    name: "Planchette de carottes",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. Pellentesque a laoreet urna. Maecenas id elit ex. Fusce pellentesque magna eu nulla molestie dignissim",
    price: 18,
    dishTypeId: "",
    id: "",
  },
  {
    name: "Planchette de fenouil",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu",
    price: 8,
    dishTypeId: "",
    id: "",
  },
  {
    name: "Assiette de tomates",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. ",
    price: 21,
    dishTypeId: "",
    id: "",
  },
];

const dishTypesList: DishType[] = [
  {
    id: uuidv4(),
    name: "Tapas",
  },
  {
    id: uuidv4(),
    name: "Entrées",
  },
  {
    id: uuidv4(),
    name: "Plats",
  },
  {
    id: uuidv4(),
    name: "Desserts",
  },
];

let newDishList: Dish[] = [];
newDishList = dishList.flatMap((dish) =>
  // creates new dish for each dishTypeList entry, with the dishTypeId from dishTypeList and a unique id. All other properties are spread from dish
  dishTypesList.map((dishType) => ({
    ...dish,
    dishTypeId: dishType.id,
    id: uuidv4(),
  }))
);

async function generateDishType() {
  return await prisma.dishType.createMany({
    data: dishTypesList,
  });
}

async function generateDishes() {
  return await prisma.dish.createMany({
    data: newDishList,
  });
}

generateDishType()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

generateDishes()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
