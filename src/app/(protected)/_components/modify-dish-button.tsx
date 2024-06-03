import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModifyDishFormSchema } from "../../../../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PencilIcon } from "lucide-react";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { modifyDishAction } from "../../../../actions/modify-dish";
import _ from "lodash";
import { toast } from "sonner";
import { useDishStore } from "@/store/dish-store-provider";
import { localDish, localDishType } from "../../../store/dish-store";

interface ModifyDishButtonProps {
  dish: localDish;
  dishType: localDishType;
}

export const ModifyDishButton = ({ dish, dishType }: ModifyDishButtonProps) => {
  const [sheetOpening, setSheetOpening] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    currentDishAndDishType,
    localDishesAndDishTypesList,
    updateDishInState,
  } = useDishStore((state) => state);

  // get the list of dish types
  const dishTypeList = localDishesAndDishTypesList.map(
    (element) => element.dishType
  );

  const modifyDishForm = useForm<z.infer<typeof ModifyDishFormSchema>>({
    resolver: zodResolver(ModifyDishFormSchema),
    defaultValues: {
      id: dish.id,
      name: dish.name,
      price: dish.price,
      description: dish.description,
      dishTypeId: dishType.id,
    },
  });

  const onSubmit = (values: z.infer<typeof ModifyDishFormSchema>) => {
    // find the selected dish type
    const currentDishType = dishTypeList.filter(
      (el) => el.id === values.dishTypeId
    );

    // Create an object with the dish and dishType form values
    const formValues: typeof currentDishAndDishType = {
      dish: {
        id: values.id,
        name: values.name,
        price: values.price,
        description: values.description,
      },
      dishType: {
        id: values.dishTypeId,
        name: currentDishType[0].name,
        order: currentDishType[0].order,
      },
    };

    // Use lodash to check if there are any changes in all properties between formValues and currentDishAndDishType
    // if they are the same, we don't need to update
    if (_.isEqual(formValues, currentDishAndDishType)) {
      setSheetOpening(false);
      return;
    }

    // Process the form submission and update the store
    startTransition(() => {
      modifyDishAction(formValues)
        .then((data) => {
          // if data.error, there was an error
          if (data.error) {
            setSheetOpening(false);
            toast.error(
              data.error ||
                "Erreur de mise à jour de la carte. Si le problème persiste, contacte l'administrateur"
            );
          }

          // if data.success and data.updatedDish, we can update the store with the new dish
          if (data.updatedDish) {
            updateDishInState(data.updatedDish);
            setSheetOpening(false);
            toast.success(data.success);
          }

          modifyDishForm.reset();
        })
        .catch((error) => {
          setSheetOpening(false);
          toast.error(error.error);
        });
    });
  };

  if (!currentDishAndDishType) {
    return <div>Je cherche la carte...</div>;
  }

  return (
    <Dialog
      open={sheetOpening} // state of the sheet
      onOpenChange={() => setSheetOpening(!sheetOpening)} // control the opening/closing state of the sheet (manually)
    >
      <DialogTrigger asChild>
        <Button
          className="p-0 h-8 w-8 text-emerald-500 bg-white border border-emerald-500 hover:bg-emerald-500 hover:text-white"
        >
          <PencilIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[95%] sm:max-w-[44rem] left-1/2 transform -translate-x-1/2 rounded-t-xl sm:rounded-t-xl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl tracking-wider">
            Modifier un plat
          </DialogTitle>
        </DialogHeader>
        <Form {...modifyDishForm}>
          <form
            onSubmit={modifyDishForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 py-8"
          >
            <div className="space-y-6">
              {/* Product name field */}
              <FormField
                control={modifyDishForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du produit</FormLabel>
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

              {/* Product description field */}
              <FormField
                control={modifyDishForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description du produit</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Product price field */}
              <FormField
                control={modifyDishForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix en euros</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step={0.01}
                        min={0}
                        max={1000}
                        onChange={(event) => {
                          field.onChange(parseFloat(event.target.value));
                        }}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Product type field */}
              <FormField
                control={modifyDishForm.control}
                name={"dishTypeId"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie de plat</FormLabel>
                    <Select
                      // we need to add a name prop to avoid a browser warning with this field
                      name="dishTypeId"
                      onValueChange={field.onChange}
                      defaultValue={currentDishAndDishType.dishType.id}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionne un type de plat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dishTypeList.map((dishType) => (
                          <SelectItem key={dishType.name} value={dishType.id}>
                            {dishType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="hover:bg-emerald-600 w-fit self-center"
            >
              Valider
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
