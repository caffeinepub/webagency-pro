import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import type { Event } from "../backend.d";
import EventCard from "../components/EventCard";
import { useGetAllEvents } from "../hooks/useQueries";

const SAMPLE_EVENTS: Event[] = [
  {
    id: 1n,
    title: "Corporate Gala 2026",
    date: BigInt(new Date("2026-03-15").getTime()) * 1000000n,
    description:
      "An exclusive black-tie corporate gala featuring award ceremonies, live entertainment, and fine dining for business leaders.",
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
      "A premier technology conference bringing together innovators, entrepreneurs, and tech visionaries from around the globe.",
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
      "Discover the finest wedding vendors, planners, and inspiration to make your dream wedding a perfect reality.",
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
      "Three days of world-class music across multiple stages featuring top international artists and emerging local talent.",
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
      "A culinary journey celebrating the finest cuisines and premium wines from Michelin-starred chefs and elite sommeliers.",
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
      "Connect with industry leaders and explore the latest trends in business strategy, innovation, and entrepreneurship.",
    imageUrl: "https://picsum.photos/seed/event6/400/250",
    category: "Business",
    capacity: 250n,
    price: 200n,
    location: "Downtown Conference Hub, Chicago",
  },
];

const STEPS = [
  {
    icon: Calendar,
    title: "Choose Your Event",
    description:
      "Browse our curated selection of premium events and find the perfect one for you.",
  },
  {
    icon: ClipboardList,
    title: "Fill Your Details",
    description:
      "Complete the simple booking form with your name, email, and contact details.",
  },
  {
    icon: CheckCircle2,
    title: "Get Confirmed",
    description:
      "Receive instant booking confirmation and prepare for an extraordinary experience.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { data: backendEvents } = useGetAllEvents();
  const events = (
    backendEvents && backendEvents.length > 0 ? backendEvents : SAMPLE_EVENTS
  ).slice(0, 4);

  const handleBook = (eventId: bigint) => {
    navigate({ to: "/book/$eventId", params: { eventId: eventId.toString() } });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://picsum.photos/seed/hero-banquet/1920/1080')",
          }}
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] border border-gold/40 px-4 py-1.5 rounded-full">
              Premium Event Experiences
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tight text-gold leading-none mb-6"
          >
            Your Event
            <br />
            <span className="text-foreground">Deserves</span>
            <br />
            The Best
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From corporate galas to intimate celebrations — discover, book, and
            experience world-class events with effortless elegance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => navigate({ to: "/events" })}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm px-10 py-6 text-base hover:opacity-90"
              data-ocid="hero.primary_button"
            >
              Explore Events <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate({ to: "/book" })}
              variant="outline"
              className="border-gold/60 text-gold hover:bg-gold/10 font-bold uppercase tracking-widest text-sm px-10 py-6 text-base"
              data-ocid="hero.secondary_button"
            >
              Book Now
            </Button>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-6 h-9 border-2 border-gold/40 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-gold rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy-800 border-y border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Events Hosted" },
              { value: "50K+", label: "Happy Guests" },
              { value: "200+", label: "Premium Venues" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-gold font-black text-3xl md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="bg-background py-20" data-ocid="events.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="section-label">Featured Events</div>
            <h2 className="section-title text-3xl md:text-4xl">
              Upcoming Experiences
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event, i) => (
              <EventCard
                key={event.id.toString()}
                event={event}
                onBook={handleBook}
                index={i}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              onClick={() => navigate({ to: "/events" })}
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10 font-bold uppercase tracking-widest text-xs px-10 py-5"
              data-ocid="events.secondary_button"
            >
              View All Events <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="bg-navy-800 py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="section-label">How It Works</div>
            <h2 className="section-title text-3xl md:text-4xl">
              Easy Booking Process
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-full border-2 border-gold/40 bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:border-gold transition-colors duration-300">
                  <step.icon className="w-7 h-7 text-gold" />
                </div>
                <div className="text-gold font-black text-4xl mb-2 opacity-20">
                  0{i + 1}
                </div>
                <h3 className="text-foreground font-bold text-lg uppercase tracking-wider mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="section-label">Testimonials</div>
            <h2 className="section-title text-3xl md:text-4xl">
              What Guests Say
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "The Corporate Gala was absolutely magnificent. Every detail was perfected to the highest standard.",
                author: "Alexandra Chen",
                role: "CEO, TechVentures Inc.",
              },
              {
                quote:
                  "Booking was seamlessly simple. The Tech Summit exceeded every expectation — a truly world-class event.",
                author: "Marcus Williams",
                role: "Product Director",
              },
              {
                quote:
                  "Our wedding expo experience was extraordinary. We found our dream vendors and made memories forever.",
                author: "Priya Sharma",
                role: "Event Guest",
              },
            ].map((t) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-gold/30 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic mb-5">
                  "{t.quote}"
                </p>
                <div>
                  <div className="text-foreground font-bold text-sm">
                    {t.author}
                  </div>
                  <div className="text-gold text-xs">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary/10 border-y border-gold/20 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase text-gold mb-4">
              Ready to Book Your Event?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of satisfied guests who've experienced the Aura
              Events difference.
            </p>
            <Button
              onClick={() => navigate({ to: "/book" })}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm px-12 py-6 text-base hover:opacity-90"
              data-ocid="cta.primary_button"
            >
              Book Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
