"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { asapFont } from "@/components/fonts/fonts";
import { ModifyDishButton } from "./modify-dish-button";
import { Dish, DishType } from "@prisma/client";
import { useDishStore } from "@/store/dish-store-provider";
import { useEffect, useTransition } from "react";
import { DeleteDishButton } from "./delete-dish-button";

interface HandleCarteProps {
  dishes: Dish[];
  dishTypes: DishType[];
}

export const HandleMeals = ({ dishes, dishTypes }: HandleCarteProps) => {
  const {
    localDishes,
    localDishTypes,
    setLocalDishes,
    setLocalDishTypes,
    setCurrentDish,
  } = useDishStore((state) => state);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setLocalDishes(dishes);
      setLocalDishTypes(dishTypes);
    });
  }, [dishes, dishTypes, setLocalDishes, setLocalDishTypes]);

  return (
    <>
      {!isPending && (
        <div
          id="carte"
          className="w-full lg:w-[50vw] p-2 md:px-24 md:py-12 border-none shadow-black shadow-lg rounded-lg bg-white bg-opacity-[95%] z-0 cursor-default tracking-widest"
        >
          <div
            className={cn(
              "w-full text-3xl text-center py-10",
              asapFont.className
            )}
          >
            <h2 className="font-bold border-y-2 h-[4rem] flex items-center justify-center">
              Gestion de la carte
            </h2>
          </div>

          <div
            className={cn(
              "flex flex-col justify-center items-center text-black gap-16",
              asapFont.className
            )}
          >
            {localDishTypes &&
              localDishTypes.map((dishType: DishType) => {
                return (
                  <div className="self-center rounded-lg" key={dishType.id}>
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
                        {localDishes &&
                          localDishes
                            // we filter by dish type
                            .filter(
                              (dish: Dish) => dish.dishTypeId === dishType.id
                            )
                            // we sort by name
                            .sort((a, b) => a.name.localeCompare(b.name, "fr"))
                            // we map over the dishes
                            .map((food: Dish, index) => (
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

                                <TableCell className="text-right font-bold text-base py-4">
                                  <div onClick={() => setCurrentDish(food)}>
                                    <ModifyDishButton />
                                    <DeleteDishButton />
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </div>
                );
              })}
            <span className="text-base text-muted-foreground font-bold">
              * TVA incl.
            </span>
          </div>
        </div>
      )}
      {isPending && (
        <div className="w-full h-full justify-center items-center text-2xl text-center">
          Je cherche la carte, attendez svp..
        </div>
      )}
    </>
  );
};