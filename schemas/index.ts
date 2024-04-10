import * as z from "zod";

const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_\-+=,.\/?!~]).{8,}$/;

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
});

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Le nom doit avoir 3 caractères au minimum." }),
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
