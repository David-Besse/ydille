"use client";

import { useState, useTransition } from "react";
import { Dish, DishType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DishSchema } from "../../../../schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
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
import { FormError } from "@/features/layout/form-error";
import { FormSuccess } from "@/features/layout/form-sucess";
import { updateDish } from "../../../../data/carte";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { modifyDish } from "../../../../actions/modify-dish";

interface ModifyDishButtonProps {
  food: Dish;
  foodType: DishType;
  dishTypesList: DishType[];
}

export const ModifyDishButton = ({
  food,
  foodType,
  dishTypesList,
}: ModifyDishButtonProps) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSucess] = useState<string | undefined>(undefined);
  const [sheetOpening, setSheetOpening] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!food) {
    throw new Error("Unable to find food");
  }

  const dishForm = useForm<z.infer<typeof DishSchema>>({
    resolver: zodResolver(DishSchema),
    defaultValues: food,
  });

  const onSubmit = (values: z.infer<typeof DishSchema>) => {
    setError("");
    setSucess("");

    startTransition(() => {
      modifyDish(values)
        .then((data) => {
          if (data) {
            setSucess("Plat modifié");
          }
          if (!data) {
            setError("Erreur de mise à jour du plat");
          }
        })
        .catch((error) => {
          setError("Une erreur est survenue");
          console.log(error);
        });
    });
  };

  return (
    <Sheet
      open={sheetOpening}
      onOpenChange={() => setSheetOpening(!sheetOpening)}
    >
      <SheetTrigger asChild>
        <Button variant="outline">
          <PencilIcon size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="w-full sm:max-w-[44rem] left-1/2 transform -translate-x-1/2 rounded-xl sm:rounded-t-xl space-y-6"
      >
        <SheetHeader>
          <SheetTitle className="text-xl uppercase">Edition :</SheetTitle>
          <SheetDescription>
            Modifie le plat puis appuie sur le bouton valider quand tu as fini.
          </SheetDescription>
        </SheetHeader>
        <Form {...dishForm}>
          <form
            onSubmit={dishForm.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <div className="space-y-4">
              <FormField
                control={dishForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du produit</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={dishForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={dishForm.control}
                name="dishTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix en euros</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionne un type de plat" />
                        </SelectTrigger>
                        <SelectContent>
                          {dishTypesList.map((dishType) => (
                            <SelectItem key={dishType.id} value={dishType.id}>
                              {dishType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button type="submit" disabled={isPending}>
              Valider
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
