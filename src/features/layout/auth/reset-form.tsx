"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CardWrapper } from "@/features/layout/auth/card-wrapper";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ResetPasswordSchema } from "../../../../schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/features/layout/form-error";
import { FormSuccess } from "@/features/layout/form-sucess";
import { login } from "../../../../actions/login";
import { resetPassword } from "../../../../actions/reset-password";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSucess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSucess("");

    startTransition(() => {
      resetPassword(values).then((data) => {
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
      headerLabel="Mot de passe oublie ?"
      backButtonLabel="Retour à la page de connexion"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Envoyer un email de reinitialisation
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
