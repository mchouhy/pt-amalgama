"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import SpinnerButton from "@/components/ui/spinner-button";
import { ROUTES } from "@/routes";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormFields, LoginFormSchema } from "@/types/login-form-types";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormFields> = async (loginFormData) => {
    try {
      const formData = new URLSearchParams();
      formData.append("email", loginFormData.email);
      formData.append("password", loginFormData.password);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
      if (!response.ok) {
        throw {
          status: response.status,
          message: response.statusText,
        };
      }
      router.push(ROUTES.books);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === 401) {
        setError("root", {
          type: "manual",
          message: "El usuario no existe o la contraseña es incorrecta",
        });
      } else if (error.status === 500) {
        setError("root", {
          type: "manual",
          message: "Ocurrió un problema en el servidor. Inténtalo más tarde.",
        });
      } else {
        setError("root", {
          type: "manual",
          message: "No se pudo conectar al servidor. Verifica tu conexión.",
        });
      }
    }
  };

  return (
    <form
      className="flex flex-col w-full gap-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            type="email"
            {...register("email")}
            autoComplete="email"
            placeholder="Ingresa tu correo electrónico"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            {...register("password")}
            type="password"
            autoComplete="current-password"
            placeholder="Ingresa tu contraseña"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        {isSubmitting ? (
          <SpinnerButton />
        ) : (
          <Button type="submit">Entrar</Button>
        )}
        {errors.root && (
          <span className="text-red-500 text-sm">{errors.root.message}</span>
        )}
      </div>
    </form>
  );
}
