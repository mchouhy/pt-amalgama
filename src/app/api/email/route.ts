import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const email = (await cookieStore).get("user-email")?.value;
  if (!email) {
    return NextResponse.json(
      { error: "No hay usuario logueado" },
      { status: 401 }
    );
  }

  return NextResponse.json({ email });
}
