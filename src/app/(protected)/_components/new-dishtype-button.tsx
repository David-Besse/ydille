import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDishTypeFormSchema } from "../../../../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChefHatIcon } from "lucide-react";
import _ from "lodash";
import { toast } from "sonner";
import { useDishStore } from "@/store/dish-store-provider";
import { newDishType } from "../../../../actions/new-dishtype";

export const NewDishTypeButton = () => {
  const [sheetOpening, setSheetOpening] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { createDishTypeInState } = useDishStore((state) => state);

  const dishTypeForm = useForm<z.infer<typeof CreateDishTypeFormSchema>>({
    resolver: zodResolver(CreateDishTypeFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateDishTypeFormSchema>) => {
    startTransition(() => {
      newDishType(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error || "Une erreur est survenue");
            return;
          }

          if (data.createdDishType) {
            createDishTypeInState(data.createdDishType);
            setSheetOpening(false);
            toast.success(data.success);
            dishTypeForm.reset();
          }
        })
        .catch((error) => {
          toast.error(error.error);
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
          Ajouter une catégorie
          <ChefHatIcon size={24} className="ml-2" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="w-[95%] sm:max-w-[44rem] left-1/2 transform -translate-x-1/2 rounded-t-xl sm:rounded-t-xl"
      >
        <SheetHeader>
          <SheetTitle className="text-xl tracking-wider">
            Ajouter une catégorie
          </SheetTitle>
        </SheetHeader>
        <Form {...dishTypeForm}>
          <form
            onSubmit={dishTypeForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 py-8"
          >
            <div className="space-y-6">
              {/* Product name field */}
              <FormField
                control={dishTypeForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base tracking-wide">
                      Nom de la catégorie de plat (exemple: entrées ou tapas
                      ...)
                    </FormLabel>
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
      </SheetContent>
    </Sheet>
  );
};
