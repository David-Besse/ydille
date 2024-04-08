"use client";

import React, { useEffect, useMemo } from "react";
import { z } from "zod";
import { FormProps, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/features/layout/Login/PasswordInput";

const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_\-+=,.\/?!~]).{8,}$/;

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Veuillez entrer votre adresse email." })
      .email({ message: "Veuillez entrer une adresse email valide." }),
    password: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères.",
      })
      .max(30, {
        message: "Le mot de passe doit contenir au maximum 20 caractères.",
      })
      .regex(passwordRegex, {
        message:
          "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@#$%^&*()_-+=,./?!~).",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères.",
      })
      .max(30, {
        message: "Le mot de passe doit contenir au maximum 20 caractères.",
      })
      .regex(passwordRegex, {
        message:
          "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
      }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Les mots de passe ne sont pas identiques.",
      });
    }
  });

const Login = () => {
  // Focus on input on mouseover
  useEffect(() => {
    const input: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".input_login");

    input.forEach((el: HTMLInputElement) =>
      el.addEventListener("mouseover", () => {
        el.focus();
      })
    );

    return () => {
      input.forEach((el: HTMLInputElement) =>
        el.removeEventListener("mouseover", () => {
          el.focus();
        })
      );
    };
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * Handles the form submission.
   *
   * @param values The form values, which is strongly typed as the inferred type from `formSchema`.
   * @returns A `Promise<void>` that resolves when the form has been reset.
   */
  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    try {
      // TODO: Call API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(values);
      form.reset();
    } catch (error) {
      console.error("Something went wrong when submitting the login form.", error);
    }
  };


  return (
    <div className="flex items-center justify-center font-semibold">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 bg-white bg-opacity-90 rounded-lg min-w-[300px] max-w-[40vw] font-[Roboto] shadow-lg shadow-black"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-bold text-base">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="input_login text-black p-1 rounded-lg border-2 font-normal hover:border-black"
                    type="email"
                    placeholder="ton email..."
                    autoComplete="current-email"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-bold text-base">
                  Mot de passe
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    className="input_login text-black p-1 rounded-lg border-2 w-full font-normal hover:border-black"
                    placeholder="ton mot de passe..."
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-bold text-base">
                  Confirmer mot de passe
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    className="input_login text-black p-1 rounded-lg border-2 w-full font-normal hover:border-black"
                    {...field}
                    placeholder="confirme ton mot de passe..."
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.confirmPassword?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-fit self-end hover:bg-green-600 hover:text-white font-bold active:bg-opacity-50"
            variant={"outline"}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
