import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDishFormSchema } from "../../../../schemas";
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
import { HandPlatterIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import _ from "lodash";
import { toast } from "sonner";
import { useDishStore } from "@/store/dish-store-provider";
import { newDishAction } from "../../../../actions/newdish";

export const NewDishButton = () => {
  const [sheetOpening, setSheetOpening] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { localDishAndDishTypeList, updateDishInState } = useDishStore(
    (state) => state
  );

  const dishTypeList = localDishAndDishTypeList.map(
    (element) => element.dishType
  );

  const dishForm = useForm<z.infer<typeof CreateDishFormSchema>>({
    resolver: zodResolver(CreateDishFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      dishTypeId: "stock",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateDishFormSchema>) => {
    startTransition(() => {
      newDishAction(values)
        .then((data) => {
          if (data.error) {
            data.error || toast.error("Erreur lors de la création du plat");
          }

          if (data.updatedDish) {
            updateDishInState(data.updatedDish);
            setSheetOpening(false);
            toast.success("Nouveau plat enregistré !");
            dishForm.reset();
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
          className="font-semibold w-[220px]  hover:border-black shadow-md"
        >
          Ajouter un plat
          <HandPlatterIcon size={24} className="ml-2" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="w-[95%] sm:max-w-[44rem] left-1/2 transform -translate-x-1/2 rounded-t-xl sm:rounded-t-xl"
      >
        <SheetHeader>
          <SheetTitle className="text-xl tracking-wider">
            Ajouter un plat
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
                        step={0.01}
                        min={0}
                        max={1000}
                        onChange={(event) => {
                          field.onChange(parseFloat(event.target.value) || "");
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
                        {dishTypeList.map((dishType) => (
                          <SelectItem key={dishType.id} value={dishType.id}>
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
