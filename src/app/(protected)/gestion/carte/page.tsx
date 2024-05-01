"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { DishTypeSchema } from "../../../../../schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllDishTypes } from "../../../../../actions/carte";
import { FormError } from "@/features/layout/form-error";
import { FormSuccess } from "@/features/layout/form-sucess";

const EditCardPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const currentMeals = getAllDishTypes();

  const mealMenuForm = useForm<z.infer<typeof DishTypeSchema>>({
    resolver: zodResolver(DishTypeSchema),
    defaultValues: {
      name: "",
      dishes: [
        {
          name: "",
          price: 0,
          description: "",
          mealmenuId: "",
        },
      ],
    },
  });

  const onSubmit = (values: z.infer<typeof DishTypeSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // settings(values)
      //   .then((data) => {
      //     if (data.error) {
      //       setError(data.error);
      //     }
      //     if (data.success) {
      //       setSuccess(data.success);
      //       update();
      //     }
      //   })
      //   .catch((error) => {
      //     setError("Une erreur est survenue");
      //   });

      console.log(values);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl">editer la carte</h2>
      <Form {...mealMenuForm}>
        <form
          onSubmit={mealMenuForm.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <div>
            <FormField
              control={mealMenuForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={field.name}
                      disabled={isPending}
                      type="text"
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              key="name"
            />
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className="w-fit self-center"
          >
            Mettre à jour
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditCardPage;
