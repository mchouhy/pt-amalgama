import { create } from "zustand";
import { Books, Authors } from "./types/books-types";
import { Users } from "./types/user-types";

interface Store {
  users: Users[];
  books: Books[];
  authors: Authors[];
  setUsers: (users: Users[]) => void;
  setBooks: (users: Books[]) => void;
  setAuthors: (users: Authors[]) => void;
  updateBookTitle: (id: number, newTitle: string) => void;
  updateAuthorName: (id: number, newName: string) => void;
}

export const useStore = create<Store>((set) => ({
  users: [],
  books: [],
  authors: [],
  setUsers: (users) => set({ users }),
  setBooks: (books) => set({ books }),
  setAuthors: (authors) => set({ authors }),
  updateBookTitle: (id, newTitle) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...book, title: newTitle } : book
      ),
    })),
  updateAuthorName: (id, newName) =>
    set((state) => ({
      authors: state.authors.map((author) =>
        author.id === id ? { ...author, name: newName } : author
      ),
    })),
}));
