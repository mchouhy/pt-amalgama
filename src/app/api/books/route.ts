import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Token no encontrado" }, { status: 401 });
  }

  const response = await fetch(
    "https://2v234d7xc7.execute-api.us-east-1.amazonaws.com/default/books",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Error al obtener los libros" },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
