import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Books } from "./types/books-types";

interface BookStoreState {
  books: Books[];
  fetchBooks: () => Promise<void>;
  updateBookTitle: (id: number, newTitle: string) => void;
  updateAuthorTitle: (id: number, newName: string) => void;
}

export const useBookStore = create(
  persist<BookStoreState>(
    (set, get) => ({
      books: [],
      fetchBooks: async () => {
        const storedBooks = get().books;
        if (storedBooks.length > 0) return;
        try {
          const response = await fetch("/api/books");
          if (!response.ok) {
            throw new Error("Error al obtener los libros");
          }
          const data: Books[] = await response.json();
          set({ books: data });
        } catch (error) {
          console.error(error);
        }
      },
      updateBookTitle: (id, newTitle) =>
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id ? { ...book, title: newTitle } : book
          ),
        })),
      updateAuthorTitle: (id, newName) =>
        set((state) => ({
          books: state.books.map((book) =>
            book.author.id === id
              ? {
                  ...book,
                  author: { ...book.author, name: newName },
                }
              : book
          ),
        })),
    }),
    {
      name: "books-storage",
    }
  )
);
