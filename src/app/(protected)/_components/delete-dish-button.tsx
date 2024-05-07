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

export function DeleteDishButton() {
  const { currentDish, deleteOneInLocalDishes } = useDishStore(
    (state) => state
  );

  const handleDelete = () => {
    try {
      deleteOneInLocalDishes(currentDish);
      toast.success("Plat supprimé");
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-destructive">
          <DeleteIcon size={18} className="text-white" />
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
              className="text-base font-bold hover:bg-emerald-500 hover:text-white"
            >
              OUI
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              className="text-base font-bold hover:bg-destructive hover:text-white"
            >
              NON
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
