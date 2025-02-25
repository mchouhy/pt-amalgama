"use client";

import { useEffect, useState } from "react";
import { Books } from "@/types/books-types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BooksClient = () => {
  const [books, setBooks] = useState<Books[]>([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Table className="max-w-3xl mx-auto h-[30vh] border mt-5">
      <TableCaption>Listado de libros disponibles.</TableCaption>
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
  );
};

export default BooksClient;
