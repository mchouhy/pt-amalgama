export type Author = {
  id: string;
  name: string;
};

export type Books = {
  id: number;
  title: string;
  author: Author;
};
