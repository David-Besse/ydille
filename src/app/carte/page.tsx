import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const foodList: { name: string; description: string; price: number }[] = [
  {
    name: "Planchette de charcuterie",
    description: "Saucisse, fenouil, carottes, tomate, salade, olive",
    price: 15,
  },
  {
    name: "Planchette de carottes",
    description: "Saucisse, fenouil, carottes, tomate, salade, olive",
    price: 18,
  },
  {
    name: "Planchette de fenouil",
    description: "Saucisse, fenouil, carottes, tomate, salade, olive",
    price: 8,
  },
  {
    name: "Planchette de carottes",
    description: "Saucisse, fenouil, carottes, tomate, salade, olive",
    price: 21,
  },
  {
    name: "Planchette de fenouil",
    description: "Saucisse, fenouil, carottes, tomate, salade, olive",
    price: 20,
  },
];

const mealMenu: {
  name: string;
  dishList: { name: string; description: string; price: number }[];
}[] = [
  {
    name: "Tapas",
    dishList: foodList,
  },
  {
    name: "Entrées",
    dishList: foodList,
  },
  {
    name: "Plats",
    dishList: foodList,
  },
  {
    name: "Desserts",
    dishList: foodList,
  },
];

const Carte = () => {
  return (
    <div
      id="carte"
      className="max-w-4xl p-2 md:p-8 border shadow-black shadow-lg rounded-lg bg-white bg-opacity-90 z-0"
    >
      <div className="w-full flex items-center justify-between text-3xl font-bold self-center py-10">
        <h2>Carte</h2>
        <span className="text-sm text-muted-foreground">* TVA incl.</span>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-8">
        {mealMenu.map((carteType) => {
          return (
            <div className="self-center border rounded-lg tracking-wide" key={carteType.name}>
              <Table className="overflow-hidden">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black font-bold">
                      {carteType.name}
                    </TableHead>
                    <TableHead className="text-right w-[4rem] ">
                      Prix*
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carteType.dishList.map((foodItem, index) => (
                    <TableRow className="border-none" key={foodItem.name}>
                      <TableCell>
                        <p className="font-bold ">{index}{" "}{foodItem.name}</p>
                        <p className="text-muted-foreground ">
                          {foodItem.description}
                        </p>
                      </TableCell>
                      <TableCell className="text-right ">
                        {foodItem.price}€
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carte;
