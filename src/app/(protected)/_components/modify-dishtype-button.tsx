import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PencilIcon } from "lucide-react";
import { modifyDishTypeAction } from "../../../../actions/modify-dishtype";
import _ from "lodash";
import { toast } from "sonner";
import { useDishStore } from "@/store/dish-store-provider";
import { ModifyDishTypeFormSchema } from "../../../../schemas";

interface ModifyDishTypeButtonProps {
  dishTypeElement: {
    id: string;
    name: string;
    order: number;
  };
}

export const ModifyDishTypeButton = ({
  dishTypeElement,
}: ModifyDishTypeButtonProps) => {
  const [sheetOpening, setSheetOpening] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { updateDishTypeInState } = useDishStore((state) => state);

  const modifyDishTypeForm = useForm<z.infer<typeof ModifyDishTypeFormSchema>>({
    resolver: zodResolver(ModifyDishTypeFormSchema),
    defaultValues: {
      id: dishTypeElement.id,
      name: dishTypeElement.name,
      order: dishTypeElement.order,
    },
  });

  const onSubmit = (values: z.infer<typeof ModifyDishTypeFormSchema>) => {
    // Use lodash to check if there are any changes in properties between form values and dishTypeElement
    if (_.isEqual(values, dishTypeElement)) {
      setSheetOpening(false);
      return;
    }

    // Process the form submission and update the store
    startTransition(() => {
      modifyDishTypeAction({
        id: values.id,
        name: values.name,
        order: values.order,
      })
        .then((data) => {
          // if data.error, there was an error
          if (data.error) {
            setSheetOpening(false);
            toast.error(
              data.error ||
                "Erreur de mise à jour de la catégorie. Si le problème persiste, contacte l'administrateur"
            );
          }

          // if data.success and data.dish, we have a new dish and we can update the store
          if (data.success) {
            updateDishTypeInState(data.updatedDishType);
            setSheetOpening(false);
            toast.success(data.success);
          }

          modifyDishTypeForm.reset();
        })
        .catch((error) => {
          setSheetOpening(false);
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
          className="p-0 h-6 w-6 hover:border-black hover:shadow-md"
        >
          <PencilIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] sm:max-w-[44rem] left-1/2 transform -translate-x-1/2 rounded-t-xl sm:rounded-t-xl">
        <DialogHeader>
          <DialogTitle className="text-xl tracking-wider">
            Modifier une catégorie
          </DialogTitle>
        </DialogHeader>
        <Form {...modifyDishTypeForm}>
          <form
            onSubmit={modifyDishTypeForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 py-8"
          >
            <div className="space-y-6">
              {/* Product name field */}
              <FormField
                control={modifyDishTypeForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de la catégorie</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        disabled={isPending}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="hover:bg-emerald-600"
            >
              Valider
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
