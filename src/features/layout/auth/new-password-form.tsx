"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "../../../../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/features/layout/auth/card-wrapper";
import { InputExtended } from "@/features/layout/auth/input-extended";
import { FormError } from "@/features/layout/form-error";
import { FormSuccess } from "@/features/layout/form-sucess";
import { newPassword } from "../../../../actions/new-password";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSucess] = React.useState<string | undefined>("");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSucess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        if (data?.success) {
          setSucess(data.success);
          form.reset();
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Entrer un nouveau mot de passe"
      backButtonLabel="Retour à la page de connexion"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
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
                      className=""
                      disabled={isPending}
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
                      className=""
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Réinitialiser le mot de passe
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
