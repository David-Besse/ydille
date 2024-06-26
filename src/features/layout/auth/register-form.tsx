"use client";

import * as React from "react";
import { CardWrapper } from "@/features/layout/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "../../../../schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputExtended } from "@/features/layout/auth/input-extended";
import { ToastMessage } from "@/features/layout/ToastMessage";
import { register } from "../../../../actions/register";

export const RegisterForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSucess] = React.useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSucess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        if (data?.success) {
          setSucess(data.success);
          form.reset();
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Création de compte"
      backButtonLabel="Déja un compte ?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="John Doe"
                      className=""
                      disabled={isPending}
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john.doe@example.com"
                      className=""
                      disabled={isPending}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <InputExtended
                      {...field}
                      type="password"
                      placeholder="********"
                      disabled={isPending}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <InputExtended
                      {...field}
                      type="password"
                      placeholder="********"
                      disabled={isPending}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ToastMessage message={{ success: success, error: error }} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Créer un compte
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
