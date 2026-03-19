import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-navy-900 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/40">
                <Calendar className="w-4 h-4 text-gold" />
              </div>
              <div className="leading-none">
                <span className="text-gold font-black text-lg uppercase tracking-widest">
                  AURA
                </span>
                <span className="text-foreground/60 text-xs uppercase tracking-[0.2em] font-medium block">
                  EVENTS
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium event booking platform for corporate galas, conferences,
              weddings, and unforgettable experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "Events", to: "/events" },
                { label: "Book Now", to: "/book" },
                { label: "Admin Panel", to: "/admin" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                events@auraevents.com
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                +1 (800) 288-7228
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                123 Grand Boulevard, New York, NY 10001
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-5">
              Social Media
            </h4>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="https://example.com"
                  aria-label={label}
                  className="w-10 h-10 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <span>© {year} Aura Events. All rights reserved.</span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
