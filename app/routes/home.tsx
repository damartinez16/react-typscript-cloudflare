import { useState } from "react";
import BookCard from "../components/BookCard";
import type { OpenLibraryBook } from "../types/book";

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
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
      </div>
    </main>
  );
}