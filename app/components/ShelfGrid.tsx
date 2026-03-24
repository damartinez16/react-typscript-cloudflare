import type { ShelfType } from "../types/shelf";
import { SHELF_OPTIONS } from "../types/shelf";
import ShelfCard from "./ShelfCard";

type Props = {
  selectedShelf: ShelfType;
  onSelectShelf: (shelf: ShelfType) => void;
  getShelfCount: (shelf: ShelfType) => number;
};

export default function ShelfGrid({
  selectedShelf,
  onSelectShelf,
  getShelfCount,
}: Props) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">My Bookshelves</h2>

      <div className="grid gap-4">
        {SHELF_OPTIONS.map((shelf) => (
          <ShelfCard
            key={shelf}
            shelf={shelf}
            count={getShelfCount(shelf)}
            isSelected={selectedShelf === shelf}
            onSelect={onSelectShelf}
          />
        ))}
      </div>
    </section>
  );
}