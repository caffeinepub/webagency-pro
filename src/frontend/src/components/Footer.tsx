import { Link } from "@tanstack/react-router";
import { SiFacebook } from "react-icons/si";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-navy-800 border-t border-navy-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary flex items-center justify-center font-black text-navy-900 text-lg rounded-sm">
                R
              </div>
              <span className="text-white font-black text-lg tracking-wider">
                RH<span className="text-gold"> Freelancer</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mt-3 max-w-xs">
              Low cost business cards are made. Premium visiting card creator.
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-gold transition-colors uppercase tracking-wider font-semibold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex justify-end gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61576658279275"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-sm bg-navy-700 border border-navy-600 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-200"
              aria-label="Facebook"
            >
              <SiFacebook size={16} />
            </a>
          </div>
        </div>

        <div className="border-t border-navy-600 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-muted-foreground text-xs">
            &copy; {year} RH Freelancer. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
