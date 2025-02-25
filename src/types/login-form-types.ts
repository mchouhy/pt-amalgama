import { z } from "zod";

export interface LoginResponse {
  token: string;
}

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email("El correo electrónico debe ser válido.")
    .min(5, "El correo electrónico debe tener al menos 5 caracteres."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export type LoginFormFields = z.infer<typeof LoginFormSchema>;
