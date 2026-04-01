import { useState } from "react";
import BookCard from "../components/BookCard";
import type { OpenLibraryBook } from "../types/book";
import type { MyBook } from "../types/myBook";
import ShelfGrid from "../components/ShelfGrid";
import type { ShelfType } from "../types/shelf";
import { SHELF_LABELS } from "../types/shelf";
import BookSpine from "../components/BookSpine";
import TopNav from "../components/TopNav"

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<OpenLibraryBook[]>([]);
  const [myBooks, setMyBooks] = useState<MyBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedShelf, setSelectedShelf] =
  useState<ShelfType>("read_this_year");
  const [openBookId, setOpenBookId] = useState<string | null>(null);

  function handleToggleBook(id: string) {
    setOpenBookId((current) => (current === id ? null : id));
  }
  

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
      const el = document.getElementById("search-results");
      const bookShelf = document.getElementById("selected-shelf")
      el?.classList.remove("hidden");
      bookShelf?.classList.add("hidden");
      
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
      shelf: shelf,
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
  function getShelfCount(shelf: ShelfType) {
    return myBooks.filter((book) => book.shelf === shelf).length
  }
  const filteredBooks = myBooks.filter((book) => book.shelf === selectedShelf);
  function handleSelectShelf(shelf: ShelfType) {
    setSelectedShelf(shelf);
  
    const el = document.getElementById("search-results");
    const bookShelf = document.getElementById("selected-shelf");
    el?.classList.add("hidden");
    bookShelf?.classList.remove("hidden");
  }
  return (
    
<main className="p-6 m-6 max-w-7xl mx-auto">
<div><TopNav /></div>
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
    <div>
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

      <div className="grid gap-4" id="search-results">
        {books.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            onAdd={handleAddBook}
          />
        ))}
      </div>

    <section id="selected-shelf" className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        {SHELF_LABELS[selectedShelf]}
      </h2>

      {filteredBooks.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <div className="mt-8">
          <div className="flex items-end gap-2 overflow-x-auto pb-4 px-2">
            {filteredBooks.map((book) => (
              <BookSpine
                key={`${book.shelf}-${book.id}`}
                book={book}
                isOpen={openBookId === book.id}
                onToggle={handleToggleBook}
              />
            ))}
          </div>

          <div className="h-4 rounded bg-gradient-to-b from-amber-700 to-amber-900 shadow-inner" />
        </div>
      )}
    </section>
    </div>

    <div>
      <ShelfGrid
        selectedShelf={selectedShelf}
        onSelectShelf={handleSelectShelf}
        getShelfCount={getShelfCount}
      />
    </div>
  </div>
</main>
  );
}
