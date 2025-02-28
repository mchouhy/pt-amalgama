"use client";

import { useEffect, useState } from "react";
import { Books } from "@/types/books-types";
import { Author } from "@/types/books-types";
import Spinner from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AuthorsClient = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) {
          throw new Error("Error al obtener los libros y sus autores");
        }
        const data: Books[] = await response.json();
        const authors = data
          .map((books) => books.author)
          .reduce((acc: Author[], author: Author) => {
            if (!acc.some((a) => a.name === author.name)) {
              acc.push(author);
            }
            return acc;
          }, []);
        setAuthors(authors);
      } catch (error) {
        console.error(error);
        setError("Hubo un error al cargar los autores");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="mt-40 flex flex-col gap-y-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="font-bold text-black w-full flex justify-center">
            Autores
          </h1>
          <Table className="max-w-lg mx-auto border">
            <TableHeader>
              <TableRow>
                <TableHead>#ID</TableHead>
                <TableHead>Autor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell className="font-medium">{author.id}</TableCell>
                  <TableCell>{author.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default AuthorsClient;
