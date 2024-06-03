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
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { deleteDishAction } from "../../../../actions/delete-dish";
import { useTransition } from "react";

export function DeleteDishButton() {
  const [isPending, startTransition] = useTransition();
  const { currentDishAndDishType, deleteDishInState } = useDishStore(
    (state) => state
  );

  const handleDelete = () => {
    startTransition(() => {
      deleteDishAction(currentDishAndDishType)
        .then((data) => {
          // if data.error, there was an error
          if (data.error) {
            toast.error(data.error);
          }

          // if data.success, we can update the store
          if (data.success) {
            deleteDishInState(currentDishAndDishType);
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
        <Button className="p-0 w-8 h-8 border border-red-500 bg-white text-red-500 hover:text-white hover:bg-red-500">
          <Trash2Icon size={18} className="" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-fit">
        <DialogHeader>
          <DialogDescription className="text-slate-500 text-base font-semibold flex flex-col gap-4">
            <p>T&apos;es certain de vouloir supprimer ?</p>
            <span className="font-sans text-gray-700 font-semibold self-center">
              {currentDishAndDishType.dish.name.toUpperCase()}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              onClick={() => handleDelete()}
              className="text-base hover:bg-emerald-500 hover:text-white text-emerald-500 transition-all duration-[2000ms] ease-in-out"
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
