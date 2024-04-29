import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";

const Carte = async () => {
  const mealMenu = await db.mealMenu.findMany();
  const foodList = await db.dish.findMany();

  return (
    <div
      id="carte"
      className="w-full lg:w-[50vw] p-2 md:p-8 border shadow-black shadow-lg rounded-lg bg-white bg-opacity-[95%] z-0"
    >
      <div className="w-full flex items-center justify-between text-3xl font-bold self-center py-10">
        <h2>Carte</h2>
        <span className="text-sm text-muted-foreground">* TVA incl.</span>
      </div>

      <div className="flex flex-col justify-center items-center gap-16">
        {mealMenu.map((dishType) => {
          return (
            <div
              className="self-center border rounded-lg tracking-wider"
              key={dishType.id}
            >
              <Table className="overflow-hidden">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black font-bold text-lg">
                      {dishType.name}
                    </TableHead>
                    <TableHead className="text-right w-[4rem] font-bold">
                      Prix*
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foodList
                    .filter((foodItem) => foodItem.mealmenuId === dishType.id)
                    .map((food, index) => (
                      <TableRow
                        className="border-none"
                        key={index + "_" + food.name}
                      >
                        <TableCell>
                          <p className="font-semibold text-base">{food.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {food.description}
                          </p>
                        </TableCell>
                        <TableCell className="text-right font-bold text-base">
                          {food.price}€
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
