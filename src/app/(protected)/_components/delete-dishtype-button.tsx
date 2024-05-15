import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useDishStore } from "@/store/dish-store-provider";
import { DeleteIcon } from "lucide-react";
import { toast } from "sonner";
import { deleteDishTypeAction } from "../../../../actions/delete-dishtype";
import { useTransition } from "react";
import { localDishTypeAndDish } from "@/store/dish-store";

interface DeleteDishTypeButtonProps {
    dishTypeElement: localDishTypeAndDish;
}

export function DeleteDishTypeButton({ dishTypeElement }: DeleteDishTypeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { deleteOneInLocalDishTypes } = useDishStore(
    (state) => state
  );

  const handleDelete = () => {
    startTransition(() => {
      deleteDishTypeAction(dishTypeElement)
        .then((data) => {
          // if no data, there was an error
          if (!data) {
            toast.error(
              "Erreur de suppression de la catégorie. Si le problème persiste, contacte l'administrateur"
            );
          }

          // if data.error, there was an error
          if (data.error) {
            toast.error(data.error);
          }

          // if data.success, we can update the store
          if (data.success) {
            deleteOneInLocalDishTypes(dishTypeElement);
            toast.success(data.success);
          }
        })
        .catch((error) => {
          toast.error(error.error);
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-0 w-6 h-6  border border-red-500 bg-white text-red-500 hover:text-white hover:bg-red-500">
          <DeleteIcon size={14} className="" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription className="text-slate-500 text-base font-semibold">
            T&apos;es certain de vouloir faire ça ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              onClick={() => handleDelete()}
              className="text-base hover:bg-emerald-500 hover:text-white text-emerald-500"
              disabled={isPending}
            >
              oui
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              className="text-base hover:bg-destructive hover:text-white text-destructive"
              disabled={isPending}
            >
              non
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
