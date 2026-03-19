import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Event } from "../backend.d";
import EventCard from "../components/EventCard";
import { useGetAllEvents } from "../hooks/useQueries";

const SAMPLE_EVENTS: Event[] = [
  {
    id: 1n,
    title: "Corporate Gala 2026",
    date: BigInt(new Date("2026-03-15").getTime()) * 1000000n,
    description:
      "An exclusive black-tie corporate gala featuring award ceremonies, live entertainment, and fine dining.",
    imageUrl: "https://picsum.photos/seed/event1/400/250",
    category: "Corporate",
    capacity: 300n,
    price: 250n,
    location: "Grand Ballroom, New York",
  },
  {
    id: 2n,
    title: "Tech Summit 2026",
    date: BigInt(new Date("2026-04-22").getTime()) * 1000000n,
    description:
      "A premier technology conference bringing together innovators and tech visionaries from around the globe.",
    imageUrl: "https://picsum.photos/seed/event2/400/250",
    category: "Conference",
    capacity: 500n,
    price: 150n,
    location: "Silicon Valley Convention Center",
  },
  {
    id: 3n,
    title: "Wedding Expo & Showcase",
    date: BigInt(new Date("2026-05-10").getTime()) * 1000000n,
    description:
      "Discover the finest wedding vendors, planners, and inspiration to make your dream wedding a reality.",
    imageUrl: "https://picsum.photos/seed/event3/400/250",
    category: "Wedding",
    capacity: 200n,
    price: 75n,
    location: "Rosewood Estate, Beverly Hills",
  },
  {
    id: 4n,
    title: "Summer Music Festival",
    date: BigInt(new Date("2026-06-28").getTime()) * 1000000n,
    description:
      "Three days of world-class music across multiple stages featuring top international artists.",
    imageUrl: "https://picsum.photos/seed/event4/400/250",
    category: "Music",
    capacity: 5000n,
    price: 120n,
    location: "Central Park, New York",
  },
  {
    id: 5n,
    title: "Food & Wine Festival",
    date: BigInt(new Date("2026-07-19").getTime()) * 1000000n,
    description:
      "A culinary journey celebrating the finest cuisines and premium wines from Michelin-starred chefs.",
    imageUrl: "https://picsum.photos/seed/event5/400/250",
    category: "Food",
    capacity: 400n,
    price: 180n,
    location: "Harbor View Pavilion, San Francisco",
  },
  {
    id: 6n,
    title: "Business Innovation Forum",
    date: BigInt(new Date("2026-08-05").getTime()) * 1000000n,
    description:
      "Connect with industry leaders and explore the latest trends in business strategy and innovation.",
    imageUrl: "https://picsum.photos/seed/event6/400/250",
    category: "Business",
    capacity: 250n,
    price: 200n,
    location: "Downtown Conference Hub, Chicago",
  },
];

const CATEGORIES = [
  "All",
  "Corporate",
  "Conference",
  "Wedding",
  "Music",
  "Food",
  "Business",
];

export default function EventsPage() {
  const navigate = useNavigate();
  const { data: backendEvents, isLoading } = useGetAllEvents();
  const allEvents =
    backendEvents && backendEvents.length > 0 ? backendEvents : SAMPLE_EVENTS;

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = allEvents.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === "All" || e.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleBook = (eventId: bigint) => {
    navigate({ to: "/book/$eventId", params: { eventId: eventId.toString() } });
  };

  return (
    <>
      {/* Page Header */}
      <section className="relative bg-navy-800 pt-32 pb-16 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://picsum.photos/seed/events-bg/1920/400')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">Browse & Book</div>
            <h1 className="section-title text-4xl md:text-5xl">All Events</h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-navy-800 sticky top-16 md:top-20 z-30 border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search events or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-card border-border focus:border-gold text-sm"
                data-ocid="events.search_input"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                  }`}
                  data-ocid="events.tab"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="bg-background py-16" data-ocid="events.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="events.loading_state"
            >
              {["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => (
                <div
                  key={sk}
                  className="bg-card rounded-lg overflow-hidden border border-border"
                >
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20" data-ocid="events.empty_state">
              <div className="text-muted-foreground text-lg">
                No events found matching your search.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event, i) => (
                <EventCard
                  key={event.id.toString()}
                  event={event}
                  onBook={handleBook}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
