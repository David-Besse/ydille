"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { LoginSchema } from "../../../../schemas";
import { Input } from "@/components/ui/input";
import { InputExtended } from "@/features/layout/auth/input-extended";
import { Button } from "@/components/ui/button";
import { FormError } from "@/features/layout/form-error";
import { FormSuccess } from "@/features/layout/form-sucess";
import { login } from "../../../../actions/login";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams?.get("error") === "OAuthAccountNotLinked"
      ? "Email utilisé par un autre fournisseur !"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  
  const [error, setError] = useState<string | undefined>("");
  const [success, setSucess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSucess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            form.reset();
          }

          if (data?.success) {
            setSucess(data.success);
            form.reset();
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch((error) => {
          setError("Une erreur est survenue");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Bienvenue"
      backButtonLabel="Pas encore de compte ?"
      backButtonHref="/auth/register"
      showSocial={showTwoFactor ? false : true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="123456"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {!showTwoFactor && (
              <>
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
                          className=""
                          disabled={isPending}
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <Button
                        variant="link"
                        size="sm"
                        className="px-0 font-normal"
                        asChild
                      >
                        <Link href="/auth/reset-password">
                          Mot de passe oublie ?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactor ? "Valider" : "Se connecter"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
