import { useEffect, useState, useTransition } from "react";
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
import { toast } from "sonner";
import { orderChangeDishtypeAction } from "../../../../actions/order-change-dishtype";
import { CustomReorderItem } from "./custom-reorder-item";

export const ChangeTheOrderDishes = () => {
  const [sheetOpening, setSheetOpening] = useState(false);
  const { localDishesAndDishTypesList, setLocalDishesAndDishTypesList } =
    useDishStore((state) => state);
  const [items, setItems] = useState<
    { dishes: localDish[]; dishType: localDishType }[]
  >([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!sheetOpening) {
      setItems(localDishesAndDishTypesList);
    }
  }, [localDishesAndDishTypesList, sheetOpening]);

  const handleOrderChange = () => {
    const newItemsListOrdered = items.map((item, index) => {
      return {
        dishType: {
          ...item.dishType,
          order: index,
        },
        dishes: item.dishes,
      };
    });

    startTransition(() => {
      orderChangeDishtypeAction(newItemsListOrdered)
        .then((data) => {
          if (data.success && data.updatedDishesAndDishtypes) {
            setLocalDishesAndDishTypesList(data.updatedDishesAndDishtypes);
            toast.success(data.success);
            setSheetOpening(false);
          }
        })
        .catch((error) => {
          toast.error(error.error);
        });
    });
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
            axis="y"
            values={items}
            onReorder={setItems}
            className="flex flex-col items-center justify-center gap-2"
          >
            <AnimatePresence>
              {items.map((item, index) => (
                <CustomReorderItem
                  key={item.dishType.id}
                  item={item}
                  index={index}
                  isInactive={index === 0}
                />
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </div>

        <Button
          type="button"
          onClick={handleOrderChange}
          className="hover:bg-emerald-600 w-fit self-end"
          disabled={isPending}
        >
          Valider
        </Button>
      </DialogContent>
    </Dialog>
  );
};
