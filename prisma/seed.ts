import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Dish = {
  id: string | undefined;
  name: string;
  price: number;
  description: string;
};

type DishType = {
  id: string | undefined;
  name: string;
};

type DishDishType = {
  id: string | undefined;
  dishId: string;
  dishTypeId: string;
};

const dishList: Dish[] = [
  {
    id: undefined,
    name: "Plat de charcuterie gourmande",
    price: 18.5,
    description:
      "Savourez une sélection de charcuteries fines accompagnées de condiments et de pain frais.",
  },
  {
    id: undefined,
    name: "Salade niçoise aux délices du sud",
    price: 15.2,
    description:
      "Fraîcheur et saveurs du sud réunies dans une salade niçoise aux ingrédients de qualité.",
  },
  {
    id: undefined,
    name: "Tarte fine aux légumes du soleil",
    price: 14.8,
    description:
      "Une pâte croustillante garnie de légumes méditerranéens fondants, cuite à la perfection.",
  },
  {
    id: undefined,
    name: "Assiette de fromages affinés",
    price: 19.9,
    description:
      "Un assortiment de fromages artisanaux pour les amateurs de saveurs raffinées.",
  },
  {
    id: undefined,
    name: "Soupe à l'oignon gratinée maison",
    price: 12.5,
    description:
      "Un classique revisité, savourez cette soupe à l'oignon gratinée onctueuse et réconfortante.",
  },
  {
    id: undefined,
    name: "Burger gourmand au bœuf et aux lardons",
    price: 22.3,
    description:
      "Un burger généreux au bœuf haché fondant, agrémenté de lardons croustillants et d'une sauce gourmande.",
  },
  {
    id: undefined,
    name: "Pâtes fraîches au pesto et tomates séchées",
    price: 16.7,
    description:
      "Un plat simple et savoureux: des pâtes fraîches enrobées d'un pesto maison et de tomates séchées.",
  },
  {
    id: undefined,
    name: "Pizza végétarienne aux légumes grillés",
    price: 17.4,
    description:
      "Une pizza saine et gourmande garnie de légumes grillés et d'une mozzarella fondante.",
  },
  {
    id: undefined,
    name: "Quiche lorraine traditionnelle",
    price: 13.9,
    description:
      "Un grand classique indémodable, savourez cette quiche lorraine riche en saveurs et en textures.",
  },
  {
    id: undefined,
    name: "Poisson en papillote aux herbes fraîches",
    price: 21.1,
    description:
      "Un poisson délicatement cuit en papillote, parfumé aux herbes fraîches du jardin.",
  },
  {
    id: undefined,
    name: "Poulet rôti aux pommes de terre et aux oignons",
    price: 19.6,
    description:
      "Un plat familial réconfortant: poulet rôti accompagné de pommes de terre fondantes et d'oignons caramélisés.",
  },
  {
    id: undefined,
    name: "Tarte aux fruits de saison",
    price: 15.5,
    description:
      "Une tarte généreuse garnie de fruits frais de saison, pour un dessert gourmand et vitaminé.",
  },
  {
    id: undefined,
    name: "Crêpes sucrées maison",
    price: 12.8,
    description:
      "Des crêpes fines et moelleuses garnies de confiture, de chocolat ou de fruits frais, selon vos envies.",
  },
  {
    id: undefined,
    name: "Fondant au chocolat moelleux",
    price: 24.9,
    description:
      "Un dessert irrésistible: un fondant au chocolat moelleux à la texture fondante et au goût intense.",
  },
  {
    id: undefined,
    name: "Glace artisanale aux parfums variés",
    price: 14.2,
    description:
      "Rafraîchissez-vous avec une glace artisanale aux parfums variés, fabriquée avec des ingrédients de qualité.",
  },
  {
    id: undefined,
    name: "Spaghetti carbonara",
    description:
      "Pâtes fraîches cuites al dente, sauce onctueuse à base d'œufs, de lardons et de parmesan.",
    price: 16.9,
  },
];

const dishTypesList: DishType[] = [
  {
    id: undefined,
    name: "Tapas",
  },
  {
    id: undefined,
    name: "Entrées",
  },
  {
    id: undefined,
    name: "Plats",
  },
  {
    id: undefined,
    name: "Desserts",
  },
];

async function generateDishTypes() {
  return await prisma.dishType.createMany({
    data: dishTypesList,
  });
}

async function generateDishes() {
  await prisma.dish.createMany({
    data: dishList,
  });
}

async function generateDishDishTypes() {
  const dishTypes = await prisma.dishType.findMany();
  const dishes = await prisma.dish.findMany();

  const randomDishTypes: DishDishType[] = dishes.map((dish) => {
    return {
      id: undefined,
      dishId: dish.id,
      dishTypeId: dishTypes[Math.floor(Math.random() * dishTypes.length)].id,
    };
  });

  await prisma.dishDishType.createMany({
    data: randomDishTypes,
  });
}

generateDishTypes()
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

generateDishDishTypes()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
