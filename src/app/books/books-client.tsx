"use client";

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";

const BooksClient = () => {
  const { books, fetchBooks, updateBookTitle } = useBookStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editedTitles, setEditedTitles] = useState<{ [key: string]: string }>(
    {}
  );
  const [focusedBook, setFocusedBook] = useState<number | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        await fetchBooks();
      } catch (error) {
        console.error(error);
        setError("Hubo un error al cargar los libros");
      } finally {
        setIsLoading(false);
      }
    };
    loadBooks();
  }, [fetchBooks]);

  if (error) return <div>{error}</div>;

  const handleOnBlur = () => {
    setTimeout(() => {
      setFocusedBook(null);
    }, 1500);
  };

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
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.id}</TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={editedTitles[book.id] ?? book.title}
                      onChange={(e) =>
                        setEditedTitles({
                          ...editedTitles,
                          [book.id]: e.target.value,
                        })
                      }
                      onFocus={() => setFocusedBook(book.id)}
                      onBlur={handleOnBlur}
                      className="border-none shadow-none p-1 cursor-text"
                    ></Input>
                  </TableCell>
                  <TableCell>{book.author.name}</TableCell>
                  <TableCell>
                    {focusedBook === book.id ? (
                      <button
                        onClick={() => {
                          updateBookTitle(book.id, editedTitles[book.id]);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Guardar
                      </button>
                    ) : null}
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

export default BooksClient;
