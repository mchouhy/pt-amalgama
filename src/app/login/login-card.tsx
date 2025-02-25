import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./login-form";

export default function LoginCard() {
  return (
    <div className="flex flex-col gap-y-8 justify-center items-center h-screen px-4 md:px-0 max-w-md mx-auto">
      <Card className="w-[368px]">
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
