import { NextApiRequest, NextApiResponse } from "next";

export default async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin") {
      res.status(200).json({ message: "Inicio de sesión existoso" });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  }
}
