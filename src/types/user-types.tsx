import { Books } from "./books-types";

export type Users = {
  email: string;
  nickname: string;
  favorite_books: Books[];
};
