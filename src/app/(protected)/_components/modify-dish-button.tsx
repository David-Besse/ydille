import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModifyDishFormSchema } from "../../../../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

interface ModifyDishButtonProps {
  dish: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
  dishType: {
    id: string;
    name: string;
  };
}

export const ModifyDishButton = ({ dish, dishType }: ModifyDishButtonProps) => {
  const [sheetOpening, setSheetOpening] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    currentDishAndDishType,
    localDishAndDishTypeList,
    updateDishInState,
  } = useDishStore((state) => state);

  const dishTypeList = localDishAndDishTypeList.map(
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
      dishType: {
        id: values.dishTypeId,
        name: currentDishType[0].name,
      },
      dish: {
        id: values.id,
        name: values.name,
        price: values.price,
        description: values.description,
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
              "Erreur de mise à jour du plat. Si le problème persiste, contacte l'administrateur"
            );
          }

          // if data.success and data.dish, we have a new dish and we can update the store
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
    <Sheet
      open={sheetOpening} // state of the sheet
      onOpenChange={() => setSheetOpening(!sheetOpening)} // control the opening/closing state of the sheet (manually)
    >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="p-0 h-8 w-8 hover:border-black hover:shadow-md"
        >
          <PencilIcon size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="w-[95%] sm:max-w-[44rem] left-1/2 transform -translate-x-1/2 rounded-t-xl sm:rounded-t-xl"
      >
        <SheetHeader>
          <SheetTitle className="text-xl tracking-wider">
            Modifier un plat
          </SheetTitle>
        </SheetHeader>
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
                        onChange={(event) => {
                          field.onChange(parseInt(event.target.value));
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
                      // we need to add a name prop to avoid a browser warning with field
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
                        {localDishAndDishTypeList &&
                          localDishAndDishTypeList.map(
                            (dishAndDishTypeObject) => (
                              <SelectItem
                                key={dishAndDishTypeObject.dishType.name}
                                value={dishAndDishTypeObject.dishType.id}
                              >
                                {dishAndDishTypeObject.dishType.name}
                              </SelectItem>
                            )
                          )}
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
              className="hover:bg-emerald-600"
            >
              Valider
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
