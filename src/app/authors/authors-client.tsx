"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Authors } from "@/types/books-types";
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

const AuthorsClient = () => {
  const { books, fetchBooks, updateAuthorName } = useBookStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editedTitles, setEditedTitles] = useState<{ [key: string]: string }>(
    {}
  );
  const [focusedAuthor, setFocusedAuthor] = useState<number | null>(null);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        await fetchBooks();
      } catch (error) {
        console.error(error);
        setError("Hubo un error al cargar los autores");
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthors();
  }, [books, fetchBooks]);

  if (error) return <div>{error}</div>;

  const handleOnBlur = () => {
    setTimeout(() => {
      setFocusedAuthor(null);
    }, 1500);
  };

  const reducedBooks = books
    .map((books) => books.author)
    .reduce((acc: Authors[], author: Authors) => {
      if (!acc.some((a) => a.name === author.name)) {
        acc.push(author);
      }
      return acc;
    }, []);

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
              {reducedBooks.map((author) => (
                <TableRow key={author.id}>
                  <TableCell className="font-medium">{author.id}</TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={editedTitles[author.id] ?? author.name}
                      onChange={(e) =>
                        setEditedTitles({
                          ...editedTitles,
                          [author.id]: e.target.value,
                        })
                      }
                      onFocus={() => setFocusedAuthor(author.id)}
                      onBlur={handleOnBlur}
                      className="border-none shadow-none p-1 cursor-text"
                    ></Input>
                  </TableCell>
                  <TableCell>
                    {focusedAuthor === author.id ? (
                      <button
                        onClick={() => {
                          updateAuthorName(author.id, editedTitles[author.id]);
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

export default AuthorsClient;
