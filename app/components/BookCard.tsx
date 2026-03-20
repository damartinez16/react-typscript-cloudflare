import type { OpenLibraryBook } from "../types/book";
  
  type Props = {
    book: OpenLibraryBook;
  };
  
  export default function BookCard({ book }: Props) {
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
  
        <div>
          <h2 className="text-xl font-semibold">
            {book.title || "Untitled"}
          </h2>
  
          <p className="text-sm text-gray-600 mb-2">
            {book.author_name?.join(", ") || "Unknown author"}
          </p>
  
          {book.first_publish_year && (
            <p className="text-sm mb-2">
              First published: {book.first_publish_year}
            </p>
          )}
        </div>
      </div>
    );
  }