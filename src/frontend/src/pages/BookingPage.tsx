import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle2,
  DollarSign,
  Loader2,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Event } from "../backend.d";
import { useCreateBooking, useGetAllEvents } from "../hooks/useQueries";

const SAMPLE_EVENTS: Event[] = [
  {
    id: 1n,
    title: "Corporate Gala 2026",
    date: BigInt(new Date("2026-03-15").getTime()) * 1000000n,
    description: "An exclusive black-tie corporate gala.",
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
    description: "A premier technology conference.",
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
    description: "Discover the finest wedding vendors.",
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
    description: "Three days of world-class music.",
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
    description: "A culinary journey.",
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
    description: "Connect with industry leaders.",
    imageUrl: "https://picsum.photos/seed/event6/400/250",
    category: "Business",
    capacity: 250n,
    price: 200n,
    location: "Downtown Conference Hub, Chicago",
  },
];

export default function BookingPage() {
  const params = useParams({ strict: false }) as { eventId?: string };
  const preselectedId = params.eventId ? BigInt(params.eventId) : null;

  const { data: backendEvents } = useGetAllEvents();
  const allEvents =
    backendEvents && backendEvents.length > 0 ? backendEvents : SAMPLE_EVENTS;

  const [selectedEventId, setSelectedEventId] = useState<string>(
    preselectedId ? preselectedId.toString() : "",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingId, setBookingId] = useState<bigint | null>(null);

  const createBooking = useCreateBooking();

  const selectedEvent =
    allEvents.find((e) => e.id.toString() === selectedEventId) ?? null;

  useEffect(() => {
    if (preselectedId) setSelectedEventId(preselectedId.toString());
  }, [preselectedId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId) {
      toast.error("Please select an event.");
      return;
    }
    try {
      const id = await createBooking.mutateAsync({
        name,
        email,
        phone,
        eventId: BigInt(selectedEventId),
      });
      setBookingId(id);
      toast.success("Booking confirmed!");
    } catch {
      toast.error("Booking failed. Please try again.");
    }
  };

  if (bookingId !== null) {
    return (
      <section className="min-h-screen bg-background flex items-center justify-center px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-gold/40 rounded-xl p-10 max-w-lg w-full text-center shadow-gold"
          data-ocid="booking.success_state"
        >
          <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-gold flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-gold" />
          </div>
          <h2 className="text-2xl font-black uppercase text-gold tracking-wider mb-3">
            Booking Confirmed!
          </h2>
          <p className="text-muted-foreground mb-2">
            Your booking has been successfully submitted.
          </p>
          <div className="bg-navy-800 rounded-lg p-4 my-6">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
              Booking Reference
            </div>
            <div className="text-gold font-black text-3xl">
              #{bookingId.toString().padStart(6, "0")}
            </div>
          </div>
          {selectedEvent && (
            <div className="text-left space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-gold" />
                {new Date(
                  Number(selectedEvent.date / 1000000n),
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-gold" />
                {selectedEvent.location}
              </div>
            </div>
          )}
          <p className="text-muted-foreground text-xs">
            A confirmation will be sent to{" "}
            <strong className="text-foreground">{email}</strong>. Our team will
            contact you shortly.
          </p>
          <Button
            onClick={() => {
              setBookingId(null);
              setName("");
              setEmail("");
              setPhone("");
              setSelectedEventId("");
            }}
            className="mt-6 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs"
            data-ocid="booking.secondary_button"
          >
            Book Another Event
          </Button>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-navy-800 pt-32 pb-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="section-label">Secure Your Seat</div>
            <h1 className="section-title text-4xl md:text-5xl">
              Book Your Event
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-foreground font-bold text-xl uppercase tracking-wider mb-8">
                  Your Details
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  data-ocid="booking.modal"
                >
                  <div>
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="bg-navy-800 border-border focus:border-gold"
                      data-ocid="booking.input"
                    />
                  </div>

                  <div>
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                      className="bg-navy-800 border-border focus:border-gold"
                      data-ocid="booking.input"
                    />
                  </div>

                  <div>
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
                      Phone Number *
                    </Label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      required
                      className="bg-navy-800 border-border focus:border-gold"
                      data-ocid="booking.input"
                    />
                  </div>

                  <div>
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
                      Select Event *
                    </Label>
                    <Select
                      value={selectedEventId}
                      onValueChange={setSelectedEventId}
                    >
                      <SelectTrigger
                        className="bg-navy-800 border-border focus:border-gold"
                        data-ocid="booking.select"
                      >
                        <SelectValue placeholder="Choose an event..." />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {allEvents.map((event) => (
                          <SelectItem
                            key={event.id.toString()}
                            value={event.id.toString()}
                          >
                            {event.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={createBooking.isPending}
                    className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm py-6 hover:opacity-90"
                    data-ocid="booking.submit_button"
                  >
                    {createBooking.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Processing...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Event Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {selectedEvent ? (
                <div className="bg-card border border-gold/30 rounded-xl overflow-hidden">
                  <img
                    src={
                      selectedEvent.imageUrl ||
                      `https://picsum.photos/seed/event${selectedEvent.id}/400/250`
                    }
                    alt={selectedEvent.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-xs text-gold font-bold uppercase tracking-wider mb-2">
                      {selectedEvent.category}
                    </div>
                    <h3 className="text-foreground font-bold text-lg mb-4">
                      {selectedEvent.title}
                    </h3>
                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4 text-gold" />
                        {new Date(
                          Number(selectedEvent.date / 1000000n),
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4 text-gold" />
                        {selectedEvent.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 border-t border-border pt-4">
                      <DollarSign className="w-5 h-5 text-gold" />
                      <span className="text-gold font-black text-2xl">
                        {Number(selectedEvent.price)}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        /person
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-card border border-dashed border-border rounded-xl p-8 text-center">
                  <Calendar className="w-12 h-12 text-gold/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    Select an event to see details here.
                  </p>
                </div>
              )}

              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="text-gold font-bold text-xs uppercase tracking-wider mb-4">
                  What to Expect
                </h4>
                <ul className="space-y-3">
                  {[
                    "Instant booking confirmation",
                    "No payment required now",
                    "Seat reserved in your name",
                    "Email notification sent",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-muted-foreground text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
