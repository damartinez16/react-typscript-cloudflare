import { useState } from "react";
import type { OpenLibraryBook } from "../types/book";
import type { ShelfType } from "../types/shelf";
import { SHELF_LABELS, SHELF_OPTIONS } from "../types/shelf";

type Props = {
  book: OpenLibraryBook;
  onAdd: (book: OpenLibraryBook, shelf: ShelfType) => void;
};

export default function BookCard({ book, onAdd }: Props) {
  const [selectedShelf, setSelectedShelf] =
    useState<ShelfType>("read_this_year");

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <div className="border rounded p-4 flex gap-4 items-start">
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={book.title || "Book cover"}
          className="w-24 h-auto rounded"
        />
      ) : (
        <div className="w-24 h-32 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
          No cover
        </div>
      )}

      <div className="flex-1">
        <h2 className="text-xl font-semibold">
          {book.title || "Untitled"}
        </h2>

        <p className="text-sm text-gray-600 mb-2">
          {book.author_name?.join(", ") || "Unknown author"}
        </p>

        {book.first_publish_year && (
          <p className="text-sm mb-3">
            First published: {book.first_publish_year}
          </p>
        )}

        <div className="flex gap-2 items-center">
          <select
            className="border rounded px-3 py-2"
            value={selectedShelf}
            onChange={(e) => setSelectedShelf(e.target.value as ShelfType)}
          >
            {SHELF_OPTIONS.map((shelf) => (
              <option key={shelf} value={shelf}>
                {SHELF_LABELS[shelf]}
              </option>
            ))}
          </select>

          <button
            className="bg-green-600 text-white px-3 py-2 rounded"
            onClick={() => onAdd(book, selectedShelf)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}