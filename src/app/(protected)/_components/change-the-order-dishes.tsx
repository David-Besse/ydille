import { SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ListOrderedIcon } from "lucide-react";
import _ from "lodash";
import { useDishStore } from "@/store/dish-store-provider";
import { AnimatePresence, Reorder } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { localDish, localDishType } from "@/store/dish-store";

export const ChangeTheOrderDishes = () => {
  const [sheetOpening, setSheetOpening] = useState(false);
  const { localDishesAndDishTypesList, setLocalDishesAndDishTypesList } =
    useDishStore((state) => state);
  const [items, setItems] = useState<
    { dishes: localDish[]; dishType: localDishType }[]
  >([]);

  useEffect(() => {
    setItems(localDishesAndDishTypesList);
  }, [localDishesAndDishTypesList]);

  const handleOrderChange = () => {
    const newItemsListOrdered = items.map((item, index) => {
      return {
        dishType: {
          id: item.dishType.id,
          name: item.dishType.name,
          order: index,
        },
        dishes: item.dishes,
      };
    });

    setLocalDishesAndDishTypesList(newItemsListOrdered);

    setSheetOpening(false);
  };

  return (
    <Dialog
      open={sheetOpening} // state of the sheet
      onOpenChange={() => setSheetOpening(!sheetOpening)} // control the opening/closing state of the sheet (manually)
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="font-semibold w-[220px] h-[100px] flex flex-col items-center justify-center gap-2 text-wrap  hover:border-black shadow-md"
        >
          <ListOrderedIcon size={24} className="" />
          Modifier l&apos;ordre des catégories
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-fit rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl tracking-wider pt-4 text-nowrap">
            Modifier l&apos;ordre des catégories
          </DialogTitle>
          <DialogDescription>
            Glissez les éléments avec la souris pour modifier l&apos;ordre
            d&apos;affichage puis validez.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Reorder.Group
            values={items}
            onReorder={setItems}
            className="flex flex-col items-center justify-center gap-2"
          >
            <AnimatePresence>
              {items.map((item, index) => (
                <Reorder.Item
                  key={item.dishType.id}
                  value={item}
                  className="min-w-[150px] w-fit h-[50px] flex items-center justify-center rounded-lg border shadow-sm cursor-grab hover:bg-slate-100 hover:border-2 px-4"
                >
                  <p className="w-full text-sm text-center flex justify-between font-semibold p-1">
                    <span className="h-fit">{index}</span>{" "}
                    <span>{item.dishType.name.toUpperCase()}</span>
                  </p>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </div>

        <Button
          type="button"
          onClick={handleOrderChange}
          className="hover:bg-emerald-600 w-fit self-end"
        >
          Valider
        </Button>
      </DialogContent>
    </Dialog>
  );
};
