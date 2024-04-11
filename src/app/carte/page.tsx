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
    description: "Saucisse, fenouil, carottes, fenouil, carottes, fenouil",
    price: 15,
  },
  {
    name: "Planchette de carottes",
    description: "Saucisse, fenouil, carottes, fenouil, carottes, fenouil",
    price: 18,
  },
  {
    name: "Planchette de fenouil",
    description: "Saucisse, fenouil, carottes, fenouil, carottes, fenouil",
    price: 8,
  },
  {
    name: "Planchette de carottes",
    description: "Saucisse, fenouil, carottes, fenouil, carottes, fenouil",
    price: 21,
  },
  {
    name: "Planchette de fenouil",
    description: "Saucisse, fenouil, carottes, fenouil, carottes, fenouil",
    price: 20,
  },
];

const carte: {
  name: string;
  foodList: { name: string; description: string; price: number }[];
}[] = [
  {
    name: "Tapas",
    foodList: foodList,
  },
  {
    name: "Entrées",
    foodList: foodList,
  },
  {
    name: "Plats",
    foodList: foodList,
  },
  {
    name: "Desserts",
    foodList: foodList,
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
        {carte.map((carteType) => {
          return (
            <div className="self-center border rounded-lg tracking-wide" key={carteType.name}>
              <Table className="overflow-hidden">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black font-bold">
                      Nos tapas
                    </TableHead>
                    <TableHead className="text-right w-[4rem] ">
                      Prix*
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carteType.foodList.map((foodItem) => (
                    <TableRow className="border-none" key={foodItem.name}>
                      <TableCell>
                        <p className="font-bold ">{foodItem.name}</p>
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
