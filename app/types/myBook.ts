import type { ShelfType } from "./shelf";

export type MyBook = {
  id: string;
  title: string;
  author: string;
  coverId?: number;
  addedAt: string;
  shelf: ShelfType;
  year?: number;
};