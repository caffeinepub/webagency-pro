import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Calendar, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "Book Now", to: "/book" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900 shadow-lg border-b border-border"
          : "bg-navy-900/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/40">
              <Calendar className="w-4 h-4 text-gold" />
            </div>
            <div className="leading-none">
              <span className="text-gold font-black text-lg uppercase tracking-widest">
                AURA
              </span>
              <span className="text-foreground/70 text-xs uppercase tracking-[0.2em] font-medium block">
                EVENTS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            data-ocid="nav.section"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors duration-200 relative group"
                data-ocid="nav.link"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/book">
              <Button
                className="bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs px-6 hover:opacity-90"
                data-ocid="nav.primary_button"
              >
                Book Now
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                variant="outline"
                className="border-border text-muted-foreground hover:text-gold hover:border-gold font-semibold uppercase tracking-wider text-xs px-4"
                data-ocid="nav.secondary_button"
              >
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-foreground p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-900 border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-gold py-2"
                  onClick={() => setMenuOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/admin" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-border text-muted-foreground hover:text-gold hover:border-gold text-xs uppercase tracking-widest"
                  data-ocid="nav.secondary_button"
                >
                  Admin Panel
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
