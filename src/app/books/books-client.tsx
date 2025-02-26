"use client";

import { useEffect, useState } from "react";
import { Books } from "@/types/books-types";
import Spinner from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BooksClient = () => {
  const [books, setBooks] = useState<Books[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) {
          throw new Error("Error al obtener los libros");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
        setError("Hubo un error al cargar los libros");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="mt-40 flex flex-col gap-y-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="font-bold text-black w-full flex justify-center">
            Libros
          </h1>
          <Table className="max-w-3xl mx-auto border">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((books) => (
                <TableRow key={books.id}>
                  <TableCell className="font-medium">{books.id}</TableCell>
                  <TableCell>{books.title}</TableCell>
                  <TableCell>{books.author.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default BooksClient;
