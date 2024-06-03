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
import { PencilLineIcon } from "lucide-react";

export const MenuCard = async () => {
  // fetch data server-side for the first render
  const dishTypesAndDishesList = await db.dishType.findMany({
    include: {
      dishToDishType: {
        include: {
          dish: true,
        },
      },
    },
  });

  // format data
  const dishTypesAndDishesListFormated = dishTypesAndDishesList.map(
    (dishType) => ({
      dishType: {
        id: dishType.id,
        name: dishType.name,
        order: dishType.order,
      },
      dishes: dishType.dishToDishType.map((dish) => dish.dish),
    })
  );

  // Prevent displaying the default dishType
  const dishtypesAndDishesNoStock = dishTypesAndDishesListFormated.filter(
    (el) => {
      return el.dishType.order !== 0;
    }
  );

  // sort by order
  const dishtypesAndDishesSorted = dishtypesAndDishesNoStock.sort((a, b) => {
    return a.dishType.order - b.dishType.order;
  });

  // check if each dishType has at least one dish
  const verifyDishTypes = dishtypesAndDishesSorted.map((dishType) => {
    return dishType.dishes.length;
  });

  return (
    <div
      id="menucard"
      className="w-full min-h-[80vh] lg:w-[50vw] p-2 md:px-24 md:py-12 border-none shadow-black shadow-lg rounded-lg bg-white bg-opacity-[90%] z-0 cursor-default tracking-widest"
    >
      {verifyDishTypes.some((dishType) => dishType === 0) && (
        <div className="w-full flex flex-col justify-center items-center text-center py-6 px-1 gap-8">
          <PencilLineIcon className="w-12 h-12" />
          <p className="w-full text-base font-semibold text-center rounded-lg">
            Notre Chef est en train de modifier la carte, veuillez revenir dans
            quelques minutes...
          </p>
        </div>
      )}

      {verifyDishTypes.some((dishType) => dishType > 0) && (
        <div
          className={cn(
            "w-full text-3xl text-center py-10",
            asapFont.className
          )}
        >
          <h2 className="italic font-bold">Notre carte</h2>
        </div>
      )}

      {verifyDishTypes.some((dishType) => dishType > 0) && (
        <div
          className={cn(
            "flex flex-col justify-center items-center text-black gap-16",
            asapFont.className
          )}
        >
          {dishtypesAndDishesSorted.map((dishTypesAndDishesElement) => {
            return (
              <div
                className="w-full rounded-lg"
                key={dishTypesAndDishesElement.dishType.id}
              >
                <Table className="overflow-hidden">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-lg font-bold uppercase">
                        {dishTypesAndDishesElement.dishType.name}
                      </TableHead>
                      <TableHead className="text-base text-right w-[4rem] font-bold">
                        Prix*
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dishTypesAndDishesElement.dishes
                      // we sort the dishes by name
                      .sort((a, b) => a.name.localeCompare(b.name, "fr"))
                      // we map the dishes
                      .map((food, index) => (
                        <TableRow
                          className="border-none"
                          key={index + "_" + food.name}
                        >
                          <TableCell className="py-4 pr-8 space-y-2 font-semibold">
                            <p className="text-base">{food.name}</p>
                            <p className="text-muted-foreground leading-4 tracking-wider">
                              {food.description}
                            </p>
                          </TableCell>
                          <TableCell className="flex justify-start items-center text-nowrap font-bold text-base py-4">
                            {food.price.toFixed(2)} €
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
      )}
    </div>
  );
};
