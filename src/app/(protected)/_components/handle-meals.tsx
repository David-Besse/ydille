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
import { useDishStore } from "@/store/dish-store-provider";
import { useEffect } from "react";
import { DeleteDishButton } from "./delete-dish-button";
import { NewDishButton } from "./new-dish-button";
import { NewDishTypeButton } from "./new-dishtype-button";
import _ from "lodash";
import { DeleteDishTypeButton } from "./delete-dishtype-button";
import { ModifyDishTypeButton } from "./modify-dishtype-button";
import { ChangeTheOrderDishes } from "./change-the-order-dishes";
import { localDishesAndDishTypesList } from "@/store/dish-store";

interface HandleMealsProps {
  data: localDishesAndDishTypesList;
}

export const HandleMeals = ({ data }: HandleMealsProps) => {
  const {
    localDishesAndDishTypesList,
    setLocalDishesAndDishTypesList,
    setCurrentDishAndDishType,
  } = useDishStore((state) => state);

  useEffect(() => {
    setLocalDishesAndDishTypesList(data);
  }, [setLocalDishesAndDishTypesList, data]);

  return (
    <div
      id="handle-meals"
      className="w-full py-24 px-2 md:px-0 border-none shadow-black shadow-lg rounded-lg bg-white z-0 cursor-default tracking-widest"
    >
      <div
        className={cn("w-full text-2xl py-10 border-b-2", asapFont.className)}
      >
        <h2 className="font-bold px-2 text-center md:text-end">
          Panneau de gestion de la carte
        </h2>
      </div>

      <div className="flex flex-col md:flex-row">
        <aside className="md:w-fit flex flex-col justify-start items-center gap-2 p-2 border-b-2 md:border-b-0 md:border-r-2">
          <NewDishTypeButton />
          <NewDishButton />
          <ChangeTheOrderDishes />
        </aside>

        <div
          className={cn(
            "w-full flex flex-col justify-center items-center text-black gap-16 md:px-24 py-24",
            asapFont.className
          )}
        >
          {localDishesAndDishTypesList.length > 0 &&
            localDishesAndDishTypesList
              .sort((a, b) => a.dishType.order - b.dishType.order)
              .map((dishAndDishtype) => {
                return (
                  <div
                    className="w-full md:w-2/3 rounded-lg"
                    key={dishAndDishtype.dishType.id}
                  >
                    <Table className="overflow-hidden">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-lg font-bold uppercase flex gap-2 justify-start items-center">
                            {dishAndDishtype.dishType.order}.{" "}
                            {dishAndDishtype.dishType.name}
                            <span className="flex gap-2">
                              <ModifyDishTypeButton
                                dishTypeElement={dishAndDishtype.dishType}
                              />
                              {dishAndDishtype.dishType.order !== 0 && (
                                <DeleteDishTypeButton
                                  dishTypeElement={dishAndDishtype.dishType}
                                />
                              )}
                            </span>
                          </TableHead>
                          {/* <TableHead className="text-base text-right w-[4rem] font-bold">
                        Prix*
                      </TableHead> */}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dishAndDishtype.dishes
                          // we sort by name
                          .sort((a, b) => a.name.localeCompare(b.name, "fr"))
                          // we map over the dishes
                          .map((food, index) => (
                            <TableRow
                              className="border-none"
                              key={index + "_" + food.name}
                            >
                              <TableCell className="py-4 pr-4 space-y-2 font-semibold">
                                <p className="text-base">{food.name}</p>
                                <p className="text-muted-foreground leading-4 tracking-wider">
                                  {food.description}
                                </p>
                                <p>{food.price.toFixed(2)}€</p>
                              </TableCell>

                              <TableCell className="flex justify-end pt-4">
                                <div
                                  onClick={() =>
                                    setCurrentDishAndDishType({
                                      dishType: dishAndDishtype.dishType,
                                      dish: food,
                                    })
                                  }
                                  className="flex flex-col gap-2"
                                >
                                  <ModifyDishButton
                                    dishType={dishAndDishtype.dishType}
                                    dish={food}
                                  />
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
        </div>
      </div>
    </div>
  );
};
