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
import { cn } from "@/lib/utils";
import { asapFont } from "@/components/fonts/fonts";
import { Dish } from "@prisma/client";
import { forEach } from "lodash";
import { verify } from "crypto";
import { PencilLineIcon } from "lucide-react";

type DishTypeAndDishes = {
  id: string;
  name: string;
  dishes: Dish[];
};

const Carte = async () => {
  // fetch data server-side for the first render
  const getDishTypesAndDishes = await db.dishType.findMany({
    include: {
      dishToDishType: {
        include: {
          dish: true,
        },
      },
    },
  });

  // normalize data to match the expected format
  const dishTypes: DishTypeAndDishes[] = getDishTypesAndDishes.map(
    (dishType) => ({
      id: dishType.id,
      name: dishType.name,
      dishes: dishType.dishToDishType.map((dish) => dish.dish),
    })
  );

  // const dishTypes = [
  //   {
  //     id: "qdfkinfaqzb2dzqjbdqzjdl1zq",
  //     name: "plats",
  //     dishes: [
  //       {
  //         id: "qdfkinfaqzb2dzqjbdqzjdl1zq",
  //         name: "crevettes",
  //         price: 10,
  //         description: "crevettes rotis au four",
  //       },
  //     ],
  //   },
  // ];

  // check if each dishType has at least one dish
  const verifyDishType = dishTypes.map((dishType) => {
    return dishType.dishes.length;
  });
  console.log(verifyDishType);

  return (
    <div
      id="carte"
      className="w-full lg:w-[50vw] p-2 md:px-24 md:py-12 border-none shadow-black shadow-lg rounded-lg bg-white bg-opacity-[90%] z-0 cursor-default tracking-widest"
    >
      {verifyDishType.some((dishType) => dishType === 0) && (
        <div className="w-full flex flex-col justify-center items-center text-center py-6 px-1 gap-8">
          <PencilLineIcon className="w-12 h-12" />
          <p className="w-full text-base font-semibold text-center rounded-lg">
            Notre Chef est en train de modifier la carte, veuillez revenir dans
            quelques minutes...
          </p>
        </div>
      )}

      {verifyDishType.some((dishType) => dishType > 0) && (
        <div
          className={cn(
            "w-full text-3xl text-center py-10",
            asapFont.className
          )}
        >
          <h2 className="italic font-bold">Notre carte</h2>
        </div>
      )}

      {verifyDishType.some((dishType) => dishType > 0) && (
        <div
          className={cn(
            "flex flex-col justify-center items-center text-black gap-16",
            asapFont.className
          )}
        >
          {dishTypes.map((dishType) => {
            if (dishType.name.toLowerCase() !== "stock") {
              return (
                <div className="w-full rounded-lg" key={dishType.id}>
                  <Table className="overflow-hidden">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-lg font-bold uppercase">
                          {dishType.name}
                        </TableHead>
                        <TableHead className="text-base text-right w-[4rem] font-bold">
                          Prix*
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dishType.dishes
                        // we sort the dishes by name
                        .sort((a, b) => a.name.localeCompare(b.name, "fr"))
                        // we map the dishes
                        .map((food, index) => (
                          <TableRow
                            className="border-none"
                            key={index + "_" + food.name}
                          >
                            <TableCell className="py-4 space-y-2 font-semibold">
                              <p className="text-base">{food.name}</p>
                              <p className="text-muted-foreground leading-4 tracking-wide">
                                {food.description}
                              </p>
                            </TableCell>
                            <TableCell className="text-right font-bold text-base py-4">
                              {food.price}€
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              );
            }
          })}
          <span className="text-base text-muted-foreground font-bold">
            * TVA incl.
          </span>
        </div>
      )}
    </div>
  );
};

export default Carte;
