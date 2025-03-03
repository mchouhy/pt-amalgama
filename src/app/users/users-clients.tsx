"use client";

import { useEffect, useState } from "react";
import { Users } from "@/types/user-types";
import Spinner from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBookStore } from "@/books-store";

const UsersClient = () => {
  const { books } = useBookStore();
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="mt-40 flex flex-col gap-y-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="font-bold text-black w-full flex justify-center ">
            Usuarios
          </h1>
          <Table className="max-w-3xl mx-auto border">
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
        </>
      )}
    </div>
  );
};

export default UsersClient;
