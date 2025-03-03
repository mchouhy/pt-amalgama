export type Authors = {
  id: number;
  name: string;
};

export type Books = {
  id: number;
  title: string;
  author: Authors;
};
