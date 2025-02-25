import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const bodyText = await req.text();
  const formData = new URLSearchParams(bodyText);
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return NextResponse.json(
      { error: "Faltan parámetros de email o contraseña" },
      { status: 400 }
    );
  }
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
  const responseText = await response.text();
  let responseJson;
  try {
    responseJson = JSON.parse(responseText);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Respuesta inesperada del servidor" },
      { status: 500 }
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    );
  }
  const { token } = responseJson;

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
