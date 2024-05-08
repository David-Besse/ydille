import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DishSchema } from "../../../../schemas";
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
import { modifyDish } from "../../../../actions/modify-dish";
import _ from "lodash";
import { toast } from "sonner";
import { useDishStore } from "@/store/dish-store-provider";

export const ModifyDishButton = () => {
  const [sheetOpening, setSheetOpening] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { currentDish, localDishTypesAndDishes, updateOneInLocalDishes } =
    useDishStore((state) => state);

  const dishForm = useForm<z.infer<typeof DishSchema>>({
    resolver: zodResolver(DishSchema),
  });

  useEffect(() => {
    if (currentDish) {
      dishForm.setValue("id", currentDish.dish.id);
      dishForm.setValue("name", currentDish.dish.name);
      dishForm.setValue("description", currentDish.dish.description);
      dishForm.setValue("price", currentDish.dish.price);
      dishForm.setValue("dishTypeId", currentDish.dishTypeId);
    }
  }, [currentDish, dishForm]);

  const onSubmit = (values: z.infer<typeof DishSchema>) => {
    // We use lodash to compare objects (very useful !)
    if (_.isEqual(values, currentDish)) {
      setSheetOpening(false);
      return;
    }

    startTransition(() => {
      modifyDish(values)
        .then((data) => {
          if (data) {
            updateOneInLocalDishes(values);
            setSheetOpening(false);
            toast.success("Plat modifié");
            dishForm.reset();
          }
          if (!data) {
            toast.error("Erreur de mise à jour du plat");
          }
        })
        .catch((error) => {
          toast.error("Une erreur est survenue");
          console.log(error);
        });
    });
  };

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
        <Form {...dishForm}>
          <form
            onSubmit={dishForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 py-8"
          >
            <div className="space-y-6">
              {/* Product name field */}
              <FormField
                control={dishForm.control}
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
                control={dishForm.control}
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
                control={dishForm.control}
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
                control={dishForm.control}
                name="dishTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie de plat</FormLabel>
                    <Select
                      // we need to add a name prop to avoid a browser warning with field
                      name="dishTypeId"
                      onValueChange={field.onChange}
                      // we need to add a default value to avoid a validation error
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionne un type de plat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {localDishTypesAndDishes &&
                          localDishTypesAndDishes.map((dishType) => (
                            <SelectItem
                              key={dishType.name}
                              value={dishType.id}
                            >
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
