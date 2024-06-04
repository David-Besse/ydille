"use client";

import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { settings } from "../../../../../actions/settings";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

import { ProfilSchema } from "../../../../../schemas";
import { useCurrentUser } from "../../../../../hooks/useCurrentUser";

import { ToastMessage } from "@/features/layout/ToastMessage";
import { InputExtended } from "@/features/layout/auth/input-extended";

const ProfilePage = () => {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();

  const form = useForm<z.infer<typeof ProfilSchema>>({
    resolver: zodResolver(ProfilSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      newPassword: "",
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof ProfilSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            setSuccess(data.success);
            update();
          }
        })
        .catch((error) => {
          setError("Une erreur est survenue");
        });
    });
  };

  return (
    <Card className="w-[90%] lg:w-1/3">
      <CardHeader>
        <p className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
          Profil
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={user && user.name ? user.name : undefined}
                        disabled={isPending}
                        type="text"
                        autoComplete="username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!user?.isOAuth && (
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
                            placeholder={
                              user && user.email ? user.email : undefined
                            }
                            disabled={isPending}
                            type="email"
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
                        <FormLabel>Mot de passe actuel</FormLabel>
                        <FormControl>
                          <InputExtended
                            {...field}
                            placeholder="******"
                            disabled={isPending}
                            type="password"
                            autoComplete="current-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nouveau mot de passe</FormLabel>
                        <FormControl>
                          <InputExtended
                            {...field}
                            placeholder="******"
                            disabled={isPending}
                            type="password"
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {user?.role === UserRole.ADMIN && (
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.USER}>
                            Utilisateur
                          </SelectItem>
                          <SelectItem value={UserRole.ADMIN}>
                            Administrateur
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {!user?.isOAuth && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Authentification à 2 facteurs</FormLabel>
                        <FormDescription>
                          Activer l&apos;authentification à 2 facteurs
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <ToastMessage message={{error: error, success: success}} />
            </div>
            <Button
              disabled={isPending}
              type="submit"
              className=""
            >
              Mettre à jour
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
