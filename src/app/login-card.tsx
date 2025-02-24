"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SpinnerButton from "@/components/ui/spinner-button";
import { ROUTES } from "@/lib/routes";

export default function LoginCard() {
  return (
    <div className="flex flex-col gap-y-8 justify-center items-center h-screen px-4 md:px-0 max-w-md mx-auto">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="font-bold text-xl">
            Accede a tu cuenta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

interface LoginResponse {
  token: string;
}

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);
      console.log(formData.toString());
      const response = await fetch(
        "https://2v234d7xc7.execute-api.us-east-1.amazonaws.com/default/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );
      const data = (await response.json()) as LoginResponse;
      if (response.ok) {
        const token = data.token;
        document.cookie = `token=${token}; path=/; httpOnly; Secure; SameSite=Strict`;
        router.push(ROUTES.books);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("El usuario no existe o la contraseña es incorrecta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col w-full gap-y-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoComplete="email"
          required
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="current-password"
          minLength={6}
          required
        />
      </div>
      {loading ? <SpinnerButton /> : <Button>Entrar</Button>}
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
    </form>
  );
}
