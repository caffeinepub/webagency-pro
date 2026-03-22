import { CATEGORIES } from "@/data/mockVideos";

type CategoryTabsProps = {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
};

export default function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div
      data-ocid="category.section"
      className="sticky top-14 z-40 bg-background border-b border-border"
    >
      <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-none no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            data-ocid="category.tab"
            onClick={() => onCategoryChange(cat)}
            className={`flex-shrink-0 rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              activeCategory === cat ? "category-pill-active" : "category-pill"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
