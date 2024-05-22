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
      className="w-full p-2 md:px-24 md:py-12 border-none shadow-black shadow-lg rounded-lg bg-white bg-opacity-[95%] z-0 cursor-default tracking-widest"
    >
      <div
        className={cn(
          "w-full text-3xl text-center pt-10 pb-20",
          asapFont.className
        )}
      >
        <h2 className="font-bold h-[4rem] flex items-center justify-center">
          Gestion de la carte
        </h2>
      </div>

      <div className="flex flex-col gap-4 border-t-2 py-12">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <NewDishTypeButton />
          <NewDishButton />
          <ChangeTheOrderDishes />
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col justify-center items-center text-black gap-16",
          asapFont.className
        )}
      >
        {localDishesAndDishTypesList.length > 0 &&
          localDishesAndDishTypesList
            .sort((a, b) => a.dishType.order - b.dishType.order)
            .map((dishAndDishtype) => {
              return (
                <div
                  className="w-full rounded-lg"
                  key={dishAndDishtype.dishType.id}
                >
                  <Table className="overflow-hidden">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-lg font-bold uppercase flex gap-2 justify-start items-center">
                          {dishAndDishtype.dishType.order}. {dishAndDishtype.dishType.name}
                          <span className="flex gap-2">
                            <ModifyDishTypeButton
                              dishTypeElement={dishAndDishtype.dishType}
                            />
                            <DeleteDishTypeButton
                              dishTypeElement={dishAndDishtype.dishType}
                            />
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
  );
};
