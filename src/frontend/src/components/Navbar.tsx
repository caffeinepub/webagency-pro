import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900 shadow-[0_4px_24px_oklch(0%_0_0/0.5)] border-b border-navy-600"
          : "bg-gradient-to-b from-navy-900/95 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            data-ocid="nav.link"
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 bg-primary flex items-center justify-center font-black text-navy-900 text-lg rounded-sm gold-glow-sm">
              R
            </div>
            <span className="text-white font-black text-lg tracking-wider">
              RH<span className="text-gold"> Freelancer</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className={`text-sm font-semibold uppercase tracking-widest transition-colors duration-200 ${
                  currentPath === link.to
                    ? "text-gold"
                    : "text-white/80 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              data-ocid="nav.primary_button"
              className="btn-gold text-sm"
            >
              Contact Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-navy-800 border-t border-navy-600">
          <nav className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className={`text-sm font-semibold uppercase tracking-widest py-2 ${
                  currentPath === link.to ? "text-gold" : "text-white/80"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              data-ocid="nav.primary_button"
              className="btn-gold text-sm mt-2 justify-center"
              onClick={() => setOpen(false)}
            >
              Contact Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
