"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteCookies() {
  (await cookies()).delete("token");
  (await cookies()).delete("user-email");
}

export async function logout() {
  await deleteCookies();
  redirect("/");
}
