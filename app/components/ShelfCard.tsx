import type { ShelfType } from "../types/shelf";
import { SHELF_LABELS } from "../types/shelf";

type Props = {
    shelf: ShelfType;
    count: number;
    isSelected: boolean;
    onSelect: (shelf: ShelfType) => void;
}

export default function ShelfCard({
    shelf,
    count,
    isSelected,
    onSelect,
  }: Props) {
    return (
      <button
        onClick={() => onSelect(shelf)}
        className={`w-full border rounded-xl p-4 text-left transition ${
          isSelected
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-black border-gray-300 hover:border-blue-400"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{SHELF_LABELS[shelf]}</h3>
          <span className="text-sm">{count}</span>
        </div>
      </button>
    );
  }