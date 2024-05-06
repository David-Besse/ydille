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
import { ModifyDishButton } from "./modify-dish-button";
import { Dish, DishType } from "@prisma/client";

const HandleCarte = async () => {
  const dishTypes: DishType[] = await db.dishType.findMany();
  const dishes: Dish[] = await db.dish.findMany();

  return (
    <div
      id="carte"
      className="w-full lg:w-[50vw] p-2 md:px-24 md:py-12 border-none shadow-black shadow-lg rounded-lg bg-white bg-opacity-[95%] z-0 cursor-default tracking-widest"
    >
      <div
        className={cn("w-full text-3xl text-center py-10", asapFont.className)}
      >
        <h2 className="italic font-bold">Gestion de la carte</h2>
      </div>

      <div
        className={cn(
          "flex flex-col justify-center items-center text-black gap-16",
          asapFont.className
        )}
      >
        {dishTypes.map((dishType) => {
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
                  {dishes
                    .filter((dish: Dish) => dish.dishTypeId === dishType.id)
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

                          <ModifyDishButton food={food} foodType={dishType} dishTypesList={dishTypes} />

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
  );
};

export default HandleCarte;
