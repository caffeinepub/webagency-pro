import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, MapPin, Tag } from "lucide-react";
import { motion } from "motion/react";
import type { Event } from "../backend.d";

interface EventCardProps {
  event: Event;
  onBook: (eventId: bigint) => void;
  index?: number;
}

export default function EventCard({
  event,
  onBook,
  index = 0,
}: EventCardProps) {
  const formattedDate = new Date(
    Number(event.date / 1000000n),
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-card rounded-lg overflow-hidden border border-border shadow-card hover:border-gold/40 transition-all duration-300 flex flex-col group"
      data-ocid={`events.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={
            event.imageUrl ||
            `https://picsum.photos/seed/event${event.id}/400/250`
          }
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs uppercase tracking-wider font-bold border-0">
          <Tag className="w-3 h-3 mr-1" />
          {event.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-foreground font-bold text-lg leading-snug mb-3 group-hover:text-gold transition-colors">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-4">
          {event.description}
        </p>

        <div className="flex items-center justify-between mt-auto mb-4">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-gold" />
            <span className="text-gold font-bold text-xl">
              {Number(event.price)}
            </span>
            <span className="text-muted-foreground text-xs">/seat</span>
          </div>
          <span className="text-muted-foreground text-xs">
            {Number(event.capacity)} seats
          </span>
        </div>

        <Button
          onClick={() => onBook(event.id)}
          className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
          data-ocid={`events.primary_button.${index + 1}`}
        >
          Book Seat
        </Button>
      </div>
    </motion.div>
  );
}
