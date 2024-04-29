import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const foodList: {
  name: string;
  description: string;
  price: number;
  mealmenuId: string;
}[] = [
  {
    name: "Planchette de charcuterie",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a elementum diam. Curabitur dignissim pellentesque auctor. Fusce et ligula congue, porttitor enim nec, iaculis ante. Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. Pellentesque a laoreet urna. Maecenas id elit ex. Fusce pellentesque magna eu nulla molestie dignissim",
    price: 15,
    mealmenuId: "1",
  },
  {
    name: "Planchette de carottes",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. Pellentesque a laoreet urna. Maecenas id elit ex. Fusce pellentesque magna eu nulla molestie dignissim",
    price: 18,
    mealmenuId: "1",
  },
  {
    name: "Planchette de fenouil",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu",
    price: 8,
    mealmenuId: "1",
  },
  {
    name: "Planchette de carottes",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. ",
    price: 21,
    mealmenuId: "1",
  },
  {
    name: "Planchette de fenouil",
    description: "Saucisse, fenouil, carottes, tomate, salade, olive",
    price: 20,
    mealmenuId: "1",
  },
  {
    name: "Planchette de charcuterie",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a elementum diam. Curabitur dignissim pellentesque auctor. Fusce et ligula congue, porttitor enim nec, iaculis ante. Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. Pellentesque a laoreet urna. Maecenas id elit ex. Fusce pellentesque magna eu nulla molestie dignissim",
    price: 15,
    mealmenuId: "2",
  },
  {
    name: "Planchette de carottes",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. Pellentesque a laoreet urna. Maecenas id elit ex. Fusce pellentesque magna eu nulla molestie dignissim",
    price: 18,
    mealmenuId: "2",
  },
  {
    name: "Planchette de fenouil",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu",
    price: 8,
    mealmenuId: "2",
  },
  {
    name: "Planchette de carottes",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. ",
    price: 21,
    mealmenuId: "2",
  },
  {
    name: "Planchette de fenouil",
    description: "Saucisse, fenouil, carottes, tomate, salade, olive",
    price: 20,
    mealmenuId: "2",
  },
  {
    name: "Planchette de charcuterie",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a elementum diam. Curabitur dignissim pellentesque auctor. Fusce et ligula congue, porttitor enim nec, iaculis ante. Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. Pellentesque a laoreet urna. Maecenas id elit ex. Fusce pellentesque magna eu nulla molestie dignissim",
    price: 15,
    mealmenuId: "3",
  },
  {
    name: "Planchette de carottes",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. Pellentesque a laoreet urna. Maecenas id elit ex. Fusce pellentesque magna eu nulla molestie dignissim",
    price: 18,
    mealmenuId: "3",
  },
  {
    name: "Planchette de fenouil",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu",
    price: 8,
    mealmenuId: "3",
  },
  {
    name: "Planchette de carottes",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. ",
    price: 21,
    mealmenuId: "3",
  },
  {
    name: "Planchette de fenouil",
    description: "Saucisse, fenouil, carottes, tomate, salade, olive",
    price: 20,
    mealmenuId: "3",
  },
  {
    name: "Planchette de charcuterie",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a elementum diam. Curabitur dignissim pellentesque auctor. Fusce et ligula congue, porttitor enim nec, iaculis ante. Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. Pellentesque a laoreet urna. Maecenas id elit ex. Fusce pellentesque magna eu nulla molestie dignissim",
    price: 15,
    mealmenuId: "4",
  },
  {
    name: "Planchette de carottes",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. Pellentesque a laoreet urna. Maecenas id elit ex. Fusce pellentesque magna eu nulla molestie dignissim",
    price: 18,
    mealmenuId: "4",
  },
  {
    name: "Planchette de fenouil",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu",
    price: 8,
    mealmenuId: "4",
  },
  {
    name: "Planchette de carottes",
    description:
      "Saucisse, fenouil, carottes, tomate, salade, olive, Fusce nec lectus commodo, sagittis purus eu, tincidunt odio. ",
    price: 21,
    mealmenuId: "4",
  },
  {
    name: "Planchette de fenouil",
    description: "Saucisse, fenouil, carottes, tomate, salade, olive",
    price: 20,
    mealmenuId: "4",
  },
];

const menuList: {
  id: string;
  name: string;
}[] = [
  {
    id: "1",
    name: "Tapas",
  },
  {
    id: "2",
    name: "Entrées",
  },
  {
    id: "3",
    name: "Plats",
  },
  {
    id: "4",
    name: "Desserts",
  },
];

async function generateMenu() {
  return await prisma.mealMenu.createMany({
    data: menuList,
  });
}

async function generateDishes() {
  return await prisma.dish.createMany({
    data: foodList,
  });
}

generateMenu()
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
