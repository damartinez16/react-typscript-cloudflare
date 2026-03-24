export type ShelfType =
  | "read_this_year"
  | "want_to_read"
  | "favorites"
  | "dnf";

export const SHELF_LABELS: Record<ShelfType, string> = {
  read_this_year: "Read This Year",
  want_to_read: "Want to Read",
  favorites: "Favorites",
  dnf: "Did Not Finish",
};

export const SHELF_OPTIONS: ShelfType[] = [
  "read_this_year",
  "want_to_read",
  "favorites",
  "dnf",
];