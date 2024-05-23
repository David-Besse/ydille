import { UserRole } from "@prisma/client";
import * as z from "zod";

const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_\-+=,.\/?!~]).{8,}$/;

export const ProfilSchema = z
  .object({
    name: z.union([
      z
        .string()
        .min(3, { message: "Le nom doit contenir au moins 3 caractères." })
        .max(30, { message: "Le nom doit contenir au maximum 30 caractères." }),
      z.literal(""),
      z.undefined(),
    ]),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
    email: z.union([z.string().email(), z.literal(""), z.undefined()]),
    password: z.union([
      z
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
      z.literal(""),
      z.undefined(),
    ]),
    newPassword: z.union([
      z
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
      z.literal(""),
      z.undefined(),
    ]),
  })
  .superRefine((data, ctx) => {
    if (
      (data.password && !data.newPassword) ||
      (!data.password && data.newPassword)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez remplir tous les champs",
        path: ["newPassword"],
      });
    }

    return true;
  });

export const NewPasswordSchema = z
  .object({
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

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "L'email est requis." }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "L'email est requis." }),
  password: z.string().min(1, {
    message: "Le mot de passe est requis.",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Le nom doit contenir au moins 3 caractères." })
      .max(30, { message: "Le nom doit contenir au maximum 30 caractères." }),
    email: z
      .string()
      .min(1, { message: "L'email est requis." })
      .email({ message: "L'email est invalide." }),
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

// dish schema
export const DishSchema = z.object({
  id: z.string().trim(),
  name: z
    .string()
    .trim()
    .min(3, { message: "T'as oublié le nom de ton plat !" }),
  price: z.number().positive(),
  description: z
    .string()
    .trim()
    .min(10, { message: "T'as oublié la description !" }),
});

// dishtype schema
export const DishTypeSchema = z.object({
  id: z.string().trim(),
  name: z
    .string()
    .trim()
    .min(3, { message: "T'as oublié le nom du type de plat !" }),
  order: z.number().nonnegative().int(),
});

// one dish and his dishtype schema
export const DishAndDishTypeSchema = z.object({
  dish: DishSchema,
  dishType: DishTypeSchema,
});

export const DishesAndDishTypesListSchema = z.array(
  z.object({
    dishType: DishTypeSchema,
    dishes: z.array(DishSchema),
  })
);

export const ModifyDishFormSchema = z.object({
  id: z.string().trim(),
  name: z
    .string()
    .trim()
    .min(3, { message: "T'as oublié le nom de ton plat !" }),
  price: z.number().positive().min(1, { message: "T'as oublié le prix !" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "T'as oublié la description !" }),
  dishTypeId: z.string().trim(),
});

export const CreateDishFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "T'as oublié le nom de ton plat !" }),
  price: z.number().positive().min(1, { message: "T'as oublié le prix !" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "T'as oublié la description !" }),
  dishTypeId: z.string().trim(),
});

export const ModifyDishTypeFormSchema = z.object({
  id: z.string().trim(),
  name: z
    .string()
    .trim()
    .min(3, { message: "T'as oublié le nom de la catégorie !" }),
  order: z.number().nonnegative().int(),
});

export const CreateDishTypeFormSchema = z.object({
  id: z.string().trim().optional(),
  name: z
    .string()
    .trim()
    .min(3, { message: "T'as oublié le nom de la catégorie !" }),
  order: z.number().nonnegative().int(),
});

export const OrderChangeDishtypeSchema = z.array(
  z.object({
    dishType: DishTypeSchema,
    dishes: z.array(DishSchema),
  })
);
