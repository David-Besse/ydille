import { Dish, DishType, Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function populate() {
  const dishList: Prisma.DishCreateInput[] = [
    {
      name: "Plat de charcuterie gourmande",
      price: 18.5,
      description:
        "Savourez une sélection de charcuteries fines accompagnées de condiments et de pain frais.",
    },
    {
      name: "Salade niçoise aux délices du sud",
      price: 15.2,
      description:
        "Fraîcheur et saveurs du sud réunies dans une salade niçoise aux ingrédients de qualité.",
    },
    {
      name: "Tarte fine aux légumes du soleil",
      price: 14.8,
      description:
        "Une pâte croustillante garnie de légumes méditerranéens fondants, cuite à la perfection.",
    },
    {
      name: "Assiette de fromages affinés",
      price: 19.9,
      description:
        "Un assortiment de fromages artisanaux pour les amateurs de saveurs raffinées.",
    },
    {
      name: "Soupe à l'oignon gratinée maison",
      price: 12.5,
      description:
        "Un classique revisité, savourez cette soupe à l'oignon gratinée onctueuse et réconfortante.",
    },
    {
      name: "Burger gourmand au bœuf et aux lardons",
      price: 22.3,
      description:
        "Un burger généreux au bœuf haché fondant, agrémenté de lardons croustillants et d'une sauce gourmande.",
    },
    {
      name: "Pâtes fraîches au pesto et tomates séchées",
      price: 16.7,
      description:
        "Un plat simple et savoureux: des pâtes fraîches enrobées d'un pesto maison et de tomates séchées.",
    },
    {
      name: "Pizza végétarienne aux légumes grillés",
      price: 17.4,
      description:
        "Une pizza saine et gourmande garnie de légumes grillés et d'une mozzarella fondante.",
    },
    {
      name: "Quiche lorraine traditionnelle",
      price: 13.9,
      description:
        "Un grand classique indémodable, savourez cette quiche lorraine riche en saveurs et en textures.",
    },
    {
      name: "Poisson en papillote aux herbes fraîches",
      price: 21.1,
      description:
        "Un poisson délicatement cuit en papillote, parfumé aux herbes fraîches du jardin.",
    },
    {
      name: "Poulet rôti aux pommes de terre et aux oignons",
      price: 19.6,
      description:
        "Un plat familial réconfortant: poulet rôti accompagné de pommes de terre fondantes et d'oignons caramélisés.",
    },
    {
      name: "Tarte aux fruits de saison",
      price: 15.5,
      description:
        "Une tarte généreuse garnie de fruits frais de saison, pour un dessert gourmand et vitaminé.",
    },
    {
      name: "Crêpes sucrées maison",
      price: 12.8,
      description:
        "Des crêpes fines et moelleuses garnies de confiture, de chocolat ou de fruits frais, selon vos envies.",
    },
    {
      name: "Fondant au chocolat moelleux",
      price: 24.9,
      description:
        "Un dessert irrésistible: un fondant au chocolat moelleux à la texture fondante et au goût intense.",
    },
    {
      name: "Glace artisanale aux parfums variés",
      price: 14.2,
      description:
        "Rafraîchissez-vous avec une glace artisanale aux parfums variés, fabriquée avec des ingrédients de qualité.",
    },
    {
      name: "Spaghetti carbonara",
      description:
        "Pâtes fraîches cuites al dente, sauce onctueuse à base d'œufs, de lardons et de parmesan.",
      price: 16.9,
    },
  ];

  const dishTypesList: Prisma.DishTypeCreateInput[] = [
    {
      name: "Tapas",
    },
    {
      name: "Entrées",
    },
    {
      name: "Plats",
    },
    {
      name: "Desserts",
    },
    {
      name: "Stock",
    },
  ];

  console.log(`Start seeding dishType ...`);
  for (const dishType of dishTypesList) {
    await prisma.dishType.create({
      data: dishType,
    });
    console.log(`Created dishType with name: ${dishType.name}`);
  }

  console.log(`Start seeding dish ...`);
  for (const dish of dishList) {
    await prisma.dish.create({
      data: dish,
    });
    console.log(`Created dish with name: ${dish.name}`);
  }

  console.log(`Start seeding dishDishTypeLink ...`);
  const dishTypes: DishType[] = await prisma.dishType.findMany();
  const dishes: Dish[] = await prisma.dish.findMany();

  let dishDishTypeLinks: Prisma.DishDishTypeLinkCreateInput[] = [];
  for (const dish of dishes) {
    const link = {
      dishType: {
        connect: {
          id: dishTypes[Math.floor(Math.random() * dishTypes.length)].id,
        },
      },
      dish: {
        connect: {
          id: dish.id,
        },
      },
    };

    dishDishTypeLinks.push(link);
  }

  for (const dishDishTypeLink of dishDishTypeLinks) {
    await prisma.dishDishTypeLink.create({
      data: dishDishTypeLink,
    });
    console.log(
      `Created dishDishTypeLink : ${dishDishTypeLink.dishType?.connect?.id} - ${dishDishTypeLink.dish?.connect?.id}`
    );
  }
}

populate()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding done!");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
