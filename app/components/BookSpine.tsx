import type { MyBook } from "../types/myBook";

type Props = {
  book: MyBook;
  isOpen: boolean;
  onToggle: (id: string) => void;
};

export default function BookSpine({ book, isOpen, onToggle }: Props) {
  const coverUrl = book.coverId
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
    : null;

  return (
    <div className="relative h-64 w-16 flex items-end">
      {/* sliding cover */}
      <div
        className={`absolute bottom-2 left-0 transition-all duration-500 ease-out ${
          isOpen
            ? "-translate-x-28 opacity-100 pointer-events-auto"
            : "translate-x-0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="cursor-pointer"
          onClick={() => onToggle(book.id)}
        >
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={book.title}
              className="w-28 h-44 object-cover rounded-md shadow-xl border border-stone-300"
            />
          ) : (
            <div className="w-28 h-44 rounded-md bg-stone-200 shadow-xl border border-stone-300 flex items-center justify-center text-xs text-stone-500 text-center px-2">
              No cover
            </div>
          )}
        </div>
      </div>

      {/* spine */}
      <button
        onClick={() => onToggle(book.id)}
        className={`relative z-10 h-56 w-14 rounded-t-md rounded-b-sm shadow-md border border-stone-700 text-white flex items-center justify-center px-1 transition-all duration-300 ${
          isOpen
            ? "translate-y-[-6px] bg-gradient-to-b from-red-700 via-red-800 to-red-900"
            : "bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 hover:-translate-y-1"
        }`}
      >
        <span
          className="text-xs font-semibold tracking-wide whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {book.title}
        </span>
      </button>
    </div>
  );
}