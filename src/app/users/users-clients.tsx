"use client";

import { useEffect, useState } from "react";
import { Users } from "@/types/user-types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UsersClient = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
        setError("Hubo un error al cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Table className="max-w-3xl mx-auto h-[30vh] border mt-5">
      <TableCaption>Listado de usuarios.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Nickname</TableHead>
          <TableHead>Libros Favoritos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.email}>
            <TableCell className="font-medium">{user.email}</TableCell>
            <TableCell>{user.nickname}</TableCell>
            <TableCell className="gap-x-2">
              {user.favorite_books.map((books, index) => (
                <span key={books.id}>
                  {books.title} ({books.author.name})
                  {index === user.favorite_books.length - 1 ? "." : "; "}
                </span>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersClient;
