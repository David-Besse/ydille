import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDishFormSchema } from "../../../../schemas";
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
import { newDishAction } from "../../../../actions/new-dish";

export const NewDishButton = () => {
  const [sheetOpening, setSheetOpening] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { localDishesAndDishTypesList, updateDishInState } = useDishStore(
    (state) => state
  );

  const dishTypeList = localDishesAndDishTypesList.map(
    (element) => element.dishType
  );

  const dishForm = useForm<z.infer<typeof CreateDishFormSchema>>({
    resolver: zodResolver(CreateDishFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      dishTypeId: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof CreateDishFormSchema>) => {
    startTransition(() => {
      newDishAction(values)
        .then((data) => {
          if (data.error || !data.createdDishWithDishType) {
            data.error || toast.error("Erreur lors de la création du plat");
          }

          if (data.createdDishWithDishType) {
            updateDishInState(data.createdDishWithDishType);
            setSheetOpening(false);
            toast.success("Nouveau plat enregistré !");
            dishForm.reset();
          }
        })
        .catch((error) => {
          toast.error("Une erreur est survenue");
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
          <HandPlatterIcon size={24} className="" />
          Ajouter un plat
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] sm:max-w-[44rem] left-1/2 transform -translate-x-1/2 rounded-t-xl sm:rounded-t-xl">
        <DialogHeader>
          <DialogTitle className="text-xl tracking-wider">
            Ajouter un plat
          </DialogTitle>
        </DialogHeader>
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
