import CategoryTabs from "@/components/CategoryTabs";
import VideoCard from "@/components/VideoCard";
import { MOCK_VIDEOS } from "@/data/mockVideos";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

type HomePageProps = {
  searchQuery: string;
};

export default function HomePage({ searchQuery }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVideos = useMemo(() => {
    let videos = MOCK_VIDEOS;
    if (activeCategory !== "All") {
      videos = videos.filter((v) => v.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      videos = videos.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.channel.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q),
      );
    }
    return videos;
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen">
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="px-4 py-4 sm:px-6">
        {searchQuery && (
          <div className="mb-4 flex items-center gap-2 text-sm text-vsi-muted">
            <Search className="h-4 w-4" />
            <span>
              {filteredVideos.length} result
              {filteredVideos.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}
              &rdquo;
            </span>
          </div>
        )}

        {filteredVideos.length === 0 ? (
          <div
            data-ocid="video.empty_state"
            className="flex flex-col items-center justify-center py-24 gap-3 text-vsi-muted"
          >
            <Search className="h-12 w-12 opacity-30" />
            <p className="text-lg font-medium">No videos found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        ) : (
          <div
            data-ocid="video.list"
            className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredVideos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i + 1} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-border py-6 text-center text-xs text-vsi-subtle">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          caffeine.ai
        </a>
      </footer>
    </main>
  );
}
