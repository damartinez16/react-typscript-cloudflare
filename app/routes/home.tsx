import { useState } from "react";
import BookCard from "../components/BookCard";
import type { OpenLibraryBook } from "../types/book";
import type { MyBook } from "../types/myBook";
import type { ShelfType } from "../types/shelf"

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<OpenLibraryBook[]>([]);
  const [myBooks, setMyBooks] = useState<MyBook[]>([]);
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
  function mapToMyBook(book: OpenLibraryBook, shelf: ShelfType): MyBook {
    return {
      id: book.key,
      title: book.title || "Untitled",
      author: book.author_name?.[0] || "Unknown author",
      coverId: book.cover_i,
      addedAt: new Date().toISOString(),
      shelf: "read_this_year",
      year: new Date().getFullYear(),
    };
  }
  function handleAddBook(book: OpenLibraryBook, shelf: ShelfType) {
    const newBook = mapToMyBook(book, shelf);
  
    const alreadyExists = myBooks.some(
      (savedBook) =>
        savedBook.id === newBook.id && savedBook.shelf === newBook.shelf
    );
  
    if (alreadyExists) return;
  
    setMyBooks([...myBooks, newBook]);
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
        <BookCard
            key={book.key}
            book={book}
            onAdd={handleAddBook}
          />      
          ))}
      </div>
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Read This Year ({new Date().getFullYear()})
        </h2>

        {myBooks.length === 0 ? (
          <p>No books added yet.</p>
        ) : (
          <div className="grid gap-4">
            {myBooks.map((book) => {
              const coverUrl = book.coverId
                ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
                : null;

              return (
                <div
                  key={book.id}
                  className="border rounded p-4 flex gap-4 items-start"
                >
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={book.title}
                      className="w-20 h-auto rounded"
                    />
                  ) : (
                    <div className="w-20 h-28 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      No cover
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
