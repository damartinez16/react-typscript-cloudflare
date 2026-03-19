import { useState } from "react";

type OpenLibraryBook = {
  key: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<OpenLibraryBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchBooks() {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }

      const data: any = await res.json();
      setBooks(data.docs || []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📚 My Bookshelf</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border rounded px-3 py-2 w-full"
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={searchBooks}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="grid gap-4">
        {books.map((book) => {
          const coverUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null;

          return (
            <div
              key={book.key}
              className="border rounded p-4 flex gap-4 items-start"
            >
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
        })}
      </div>
    </main>
  );
}