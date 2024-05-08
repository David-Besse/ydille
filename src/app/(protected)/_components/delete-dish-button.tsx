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
        <Button className="p-0 w-8 h-8  border border-red-500 bg-white text-red-500 hover:text-white hover:bg-red-500">
          <DeleteIcon size={18} className="" />
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
              className="text-base bg-emerald-500 text-white"
            >
              oui
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              className="text-base bg-destructive text-white"
            >
              non
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
