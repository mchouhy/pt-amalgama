import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Books } from "./types/books-types";

interface BookStoreState {
  books: Books[];
  fetchBooks: () => Promise<void>;
  updateBookTitle: (id: number, newTitle: string) => void;
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
        set((state) => {
          const updatedBooks = state.books.map((book) =>
            book.id === id ? { ...book, title: newTitle } : book
          );
          return { books: updatedBooks };
        }),
    }),
    {
      name: "books-storage",
    }
  )
);
