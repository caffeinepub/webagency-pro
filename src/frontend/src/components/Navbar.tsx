import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Menu, Moon, Search, Sun, Video, X } from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
};

export default function Navbar({
  isDark,
  onToggleTheme,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/", search: { q: searchQuery } });
  };

  return (
    <header
      data-ocid="nav.section"
      className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background px-4 gap-2"
    >
      {/* Left: Logo + hamburger */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link
          to="/"
          search={{ q: "" }}
          data-ocid="nav.link"
          className="flex items-center gap-1.5"
        >
          <svg
            width="28"
            height="20"
            viewBox="0 0 28 20"
            fill="none"
            role="img"
            aria-label="VideoShareIt logo"
            className="flex-shrink-0"
          >
            <rect width="28" height="20" rx="4" fill="#ff0000" />
            <polygon points="11,5 22,10 11,15" fill="white" />
          </svg>
          <span className="hidden sm:block text-base font-bold text-foreground tracking-tight">
            VideoShare<span className="text-vsi-red">It</span>
          </span>
        </Link>
      </div>

      {/* Center: Search bar (desktop) */}
      <form
        onSubmit={handleSearchSubmit}
        className={`${showMobileSearch ? "hidden" : "hidden md:flex"} flex-1 max-w-xl items-center gap-2`}
      >
        <div className="flex flex-1 overflow-hidden rounded-full border border-border bg-vsi-surface focus-within:border-ring">
          <Input
            data-ocid="search.input"
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 rounded-none rounded-l-full border-0 bg-transparent px-4 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-vsi-muted"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            data-ocid="search.button"
            className="rounded-none rounded-r-full border-l border-border bg-vsi-card px-4 hover:bg-vsi-hover"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Mobile search overlay */}
      {showMobileSearch && (
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 items-center gap-2 md:hidden"
        >
          <Input
            data-ocid="search.input"
            autoFocus
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 rounded-full border-border bg-vsi-surface px-4 text-sm focus-visible:ring-1 placeholder:text-vsi-muted"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileSearch(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </form>
      )}

      {/* Right: Actions */}
      {!showMobileSearch && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileSearch(true)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
            aria-label="Upload"
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            data-ocid="nav.toggle"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-vsi-red flex items-center justify-center cursor-pointer">
            <span className="text-xs font-bold text-white">U</span>
          </div>
        </div>
      )}
    </header>
  );
}
