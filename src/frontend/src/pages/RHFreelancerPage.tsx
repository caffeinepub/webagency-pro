import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  DollarSign,
  Facebook,
  FileImage,
  Globe,
  Image,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  Star,
  ThumbsUp,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/* ─── Types ──────────────────────────────────── */
interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  price: string;
  tag: string;
  color: string;
  iconBg: string;
}

/* ─── Data ───────────────────────────────────── */
const NAV_LINKS: NavLink[] = [
  { label: "HOME", href: "#home" },
  {
    label: "SERVICES",
    href: "#services",
    children: [
      { label: "Visiting Cards", href: "#services" },
      { label: "Banner Design", href: "#services" },
      { label: "Poster Design", href: "#services" },
      { label: "Website Design", href: "#services" },
    ],
  },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

const SERVICES: ServiceItem[] = [
  {
    icon: Image,
    title: "Banner Design",
    desc: "Eye-catching banners for digital and print — grab attention instantly.",
    price: "$5",
    tag: "Best Value",
    color: "border-amber-500/20 hover:border-amber-500/50",
    iconBg: "from-amber-600/25 to-amber-500/5",
  },
  {
    icon: CreditCard,
    title: "Visiting Card Design",
    desc: "Professional business cards that leave a lasting first impression.",
    price: "$3",
    tag: "Most Popular",
    color: "border-gold/20 hover:border-gold/50",
    iconBg: "from-yellow-600/25 to-yellow-500/5",
  },
  {
    icon: FileImage,
    title: "Poster Design",
    desc: "Creative posters for events, promotions, and brand campaigns.",
    price: "$4",
    tag: "Creative Pick",
    color: "border-purple-500/20 hover:border-purple-500/50",
    iconBg: "from-purple-600/25 to-purple-500/5",
  },
  {
    icon: Globe,
    title: "Website Design",
    desc: "Modern, responsive websites that grow your business online.",
    price: "$10",
    tag: "Premium",
    color: "border-emerald-500/20 hover:border-emerald-500/50",
    iconBg: "from-emerald-600/25 to-emerald-500/5",
  },
];

const WHY_CHOOSE = [
  {
    icon: Star,
    title: "Premium Quality",
    desc: "High-quality designs delivered every time, no compromise.",
  },
  {
    icon: DollarSign,
    title: "Affordable Prices",
    desc: "Low cost without compromising quality or creativity.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Quick turnaround to meet your deadlines every time.",
  },
  {
    icon: ThumbsUp,
    title: "100% Satisfaction",
    desc: "Revisions until you are fully satisfied with the result.",
  },
];

/* ─── Helpers ────────────────────────────────── */
function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ═══════════════════════════════════════════════
   SERVICE ORDER MODAL
═══════════════════════════════════════════════ */
function ServiceOrderModal({
  service,
  onClose,
}: {
  service: ServiceItem | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    if (service) {
      setForm({ name: "", address: "", phone: "" });
      setSubmitted(false);
      setWhatsappUrl("");
    }
  }, [service]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));

    // Build pre-filled WhatsApp message
    const message = `Im ${form.name}. I am yours ${service?.title} (${service?.price}) I want to accept the service.`;
    const url = `https://wa.me/8801857527455?text=${encodeURIComponent(message)}`;

    // Save locally
    const orders = JSON.parse(localStorage.getItem("rh_orders") ?? "[]");
    orders.push({
      service: service?.title,
      price: service?.price,
      ...form,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("rh_orders", JSON.stringify(orders));

    setWhatsappUrl(url);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "oklch(0 0 0 / 0.75)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative w-full max-w-md bg-black-card rounded-2xl shadow-[0_24px_80px_oklch(0_0_0/0.7)] border border-gold/20 overflow-hidden"
          >
            {/* Top gold accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-gold-dark via-gold to-gold-light" />

            {/* Header */}
            <div className="px-7 pt-6 pb-5 border-b border-border">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase mb-1">
                    Order Service
                  </p>
                  <h3 className="font-serif text-xl font-bold text-off-white leading-tight">
                    {service.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-serif text-2xl font-bold text-gold-gradient">
                    {service.price}
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    data-ocid="order_modal.close_button"
                    className="w-8 h-8 rounded-full bg-black-surface border border-border flex items-center justify-center hover:border-gold/50 transition-colors"
                  >
                    <X className="w-4 h-4 text-silver" />
                  </button>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-7 py-6">
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="order_modal.dialog"
                >
                  <p className="text-silver text-sm leading-relaxed">
                    Please enter your details and we will contact you on
                    WhatsApp shortly.
                  </p>

                  <div>
                    <Label className="text-silver text-[11px] tracking-[0.2em] uppercase mb-2 block">
                      Your Name *
                    </Label>
                    <Input
                      data-ocid="order_modal.input"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Enter your full name"
                      className="bg-black-surface border-border text-off-white placeholder:text-muted-foreground focus:border-gold"
                    />
                  </div>

                  <div>
                    <Label className="text-silver text-[11px] tracking-[0.2em] uppercase mb-2 block">
                      Address
                    </Label>
                    <Textarea
                      value={form.address}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, address: e.target.value }))
                      }
                      placeholder="Your city / area / full address"
                      rows={2}
                      className="bg-black-surface border-border text-off-white placeholder:text-muted-foreground focus:border-gold resize-none"
                    />
                  </div>

                  <div>
                    <Label className="text-silver text-[11px] tracking-[0.2em] uppercase mb-2 block">
                      Contact Number *
                    </Label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="01XXXXXXXXX"
                      className="bg-black-surface border-border text-off-white placeholder:text-muted-foreground focus:border-gold"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    data-ocid="order_modal.submit_button"
                    className="w-full bg-gold hover:bg-gold-light text-black-deep font-bold text-xs tracking-[0.2em] uppercase py-3 h-auto rounded-full shadow-gold hover:shadow-gold-lg transition-all disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "SEND TO WHATSAPP"}
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                  data-ocid="order_modal.success_state"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-gold" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-off-white mb-2">
                    Order Ready!
                  </h4>
                  <p className="text-silver text-sm leading-relaxed mb-6">
                    Your order details have been prepared. Now tap the button
                    below to send your order directly from your WhatsApp
                    account.
                  </p>

                  {/* Prominent WhatsApp CTA */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="order_modal.primary_button"
                    className="flex items-center justify-center gap-2.5 w-full bg-gold hover:bg-gold-light text-black-deep font-bold text-xs tracking-[0.18em] uppercase py-4 rounded-full shadow-gold hover:shadow-gold-lg transition-all hover:scale-[1.02] active:scale-[0.98] mb-3"
                  >
                    <Send className="w-4 h-4" />
                    SEND MY ORDER ON WHATSAPP
                  </a>

                  <p className="text-silver/60 text-[11px] leading-relaxed mb-5 px-2">
                    Make sure you are logged into your own WhatsApp account
                    before clicking.
                  </p>

                  <p className="text-gold text-xs tracking-widest uppercase mb-4">
                    Thank you for choosing RH Freelancer
                  </p>

                  <Button
                    type="button"
                    onClick={onClose}
                    data-ocid="order_modal.cancel_button"
                    className="bg-gold/10 hover:bg-gold/20 text-gold font-semibold text-xs tracking-widest uppercase px-6 py-2 h-auto rounded-full border border-gold/30 transition-all"
                  >
                    Close
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════
   HEADER / NAVBAR
═══════════════════════════════════════════════ */
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollTo(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-[0_4px_40px_oklch(0_0_0/0.6)] backdrop-blur-xl bg-black-deep/96 border-b border-gold/10"
          : "bg-black-deep"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-3 cursor-pointer bg-transparent border-0 p-0 text-left"
            onClick={() => handleNavClick("#home")}
          >
            <img
              src="/assets/generated/rh-logo-transparent.dim_400x400.png"
              alt="RH Freelancer Logo"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="hidden sm:block">
              <p className="font-serif font-bold text-off-white tracking-wide text-lg leading-none">
                RH Freelancer
              </p>
              <p className="text-gold text-[10px] tracking-[0.3em] uppercase mt-0.5">
                Design Studio
              </p>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-silver hover:text-gold transition-colors text-xs font-medium tracking-[0.18em] uppercase"
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  <div className="absolute top-full left-0 mt-3 w-52 bg-black-card border border-border rounded-xl shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                    {link.children.map((child) => (
                      <button
                        type="button"
                        key={child.label}
                        onClick={() => handleNavClick(child.href)}
                        className="block w-full text-left px-5 py-3 text-sm text-silver hover:text-gold hover:bg-black-surface transition-colors"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-silver hover:text-gold transition-colors text-xs font-medium tracking-[0.18em] uppercase"
                >
                  {link.label}
                </button>
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-black-deep"
    >
      {/* Luxurious gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_50%,oklch(0.55_0.13_76/0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_100%_20%,oklch(0.76_0.135_80/0.06),transparent_60%)]" />
      {/* Gold particle dots */}
      <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-gold opacity-40" />
      <div className="absolute top-2/3 right-1/3 w-1 h-1 rounded-full bg-gold opacity-25" />
      <div className="absolute top-1/2 right-1/6 w-2 h-2 rounded-full bg-gold opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid grid-cols-1 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 rounded-full px-4 py-1.5 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase">
                Premium Design Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6"
            >
              Creative Designs
              <br />
              <span className="text-gold-gradient">That Speak Volumes</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-silver text-lg leading-relaxed mb-10 max-w-xl"
            >
              Premium quality visiting cards, banners, posters, and websites at
              the most affordable prices. Your brand deserves the very best.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black-deep to-transparent pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SERVICES SECTION
═══════════════════════════════════════════════ */
function ServicesSection({
  onOrderService,
}: { onOrderService: (svc: ServiceItem) => void }) {
  return (
    <section
      id="services"
      className="bg-black-mid py-24 relative overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-[11px] font-semibold tracking-[0.35em] uppercase mb-3">
            What We Offer
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white tracking-wide">
            Our Creative Services
          </h2>
          <div className="gold-divider mx-auto mt-5" />
          <p className="text-silver text-sm mt-4 max-w-md mx-auto">
            Click any service to place your order — we'll reach out on WhatsApp!
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-ocid="services.list"
        >
          {SERVICES.map((svc, i) => (
            <motion.button
              key={svc.title}
              type="button"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              onClick={() => onOrderService(svc)}
              data-ocid={`services.item.${i + 1}`}
              className={`group text-left bg-black-card rounded-2xl p-7 shadow-card hover:shadow-gold border ${
                svc.color
              } transition-all duration-300 hover:-translate-y-2 cursor-pointer w-full`}
            >
              {/* Tag badge */}
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-13 h-13 rounded-xl bg-gradient-to-br ${svc.iconBg} border border-gold/15 flex items-center justify-center w-12 h-12 group-hover:scale-110 transition-transform duration-300`}
                >
                  <svc.icon className="w-6 h-6 text-gold" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gold/70 border border-gold/20 rounded-full px-2.5 py-0.5">
                  {svc.tag}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-off-white mb-2 tracking-wide group-hover:text-gold transition-colors">
                {svc.title}
              </h3>
              <p className="text-silver text-sm leading-relaxed mb-5">
                {svc.desc}
              </p>

              {/* Price row */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-serif text-2xl font-bold text-gold-gradient">
                  {svc.price}
                </span>
                <span className="flex items-center gap-1 text-gold text-xs font-semibold group-hover:gap-2 transition-all">
                  ORDER <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ABOUT SECTION
═══════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section id="about" className="bg-black-deep py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
              Who We Are
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-off-white tracking-wide mb-2">
              About RH Freelancer
            </h2>
            <div className="gold-divider mb-6" />
            <p className="text-silver leading-relaxed mb-5">
              RH Freelancer is a premium graphic design studio based in
              Satkania, Chattogram. We specialize in creating stunning visual
              designs that help businesses stand out from the crowd.
            </p>
            <p className="text-silver leading-relaxed mb-8">
              From professional visiting cards that make lasting impressions, to
              eye-catching banners, creative posters, and fully responsive
              websites — premium quality at unbeatable prices.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                "Visiting Card Design",
                "Banner Design",
                "Poster Design",
                "Website Design",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-silver text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   WHY CHOOSE SECTION
═══════════════════════════════════════════════ */
function WhyChooseSection() {
  return (
    <section className="bg-black-card py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-[11px] font-semibold tracking-[0.35em] uppercase mb-3">
            Our Advantage
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white tracking-wide">
            Why Choose RH Freelancer?
          </h2>
          <div className="gold-divider mx-auto mt-5" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              className="text-center group p-6 rounded-2xl border border-transparent hover:border-gold/15 hover:bg-black-surface/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-gold/8 border border-gold/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/15 group-hover:border-gold/40 transition-all duration-300">
                <item.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-off-white mb-2 tracking-wide">
                {item.title}
              </h3>
              <p className="text-silver text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CONTACT SECTION
═══════════════════════════════════════════════ */
function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-black-mid py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,oklch(0.76_0.135_80/0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-[11px] font-semibold tracking-[0.35em] uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-off-white tracking-wide">
            Contact Us
          </h2>
          <div className="gold-divider mx-auto mt-5" />
        </motion.div>

        <div className="flex justify-center">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5 w-full max-w-lg"
          >
            {[
              {
                icon: Mail,
                label: "Email",
                value: "anas2010@gmail.com",
                href: "mailto:anas2010@gmail.com",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Satkania, Chattogram",
                href: "https://maps.google.com/?q=Satkania,Chattogram",
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  c.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="flex items-start gap-4 group p-4 rounded-xl border border-transparent hover:border-gold/20 hover:bg-black-card transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-gold/8 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/15 group-hover:border-gold/40 transition-colors">
                  <c.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-silver text-[11px] tracking-[0.2em] uppercase mb-0.5">
                    {c.label}
                  </p>
                  <p className="text-off-white text-sm font-medium group-hover:text-gold transition-colors">
                    {c.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2 pl-4">
              <a
                href="https://www.facebook.com/profile.php?id=61576658279275"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/8 border border-gold/20 flex items-center justify-center hover:bg-gold/20 hover:border-gold/40 transition-all"
              >
                <Facebook className="w-4 h-4 text-gold" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/8 border border-gold/20 flex items-center justify-center hover:bg-gold/20 hover:border-gold/40 transition-all"
              >
                <Instagram className="w-4 h-4 text-gold" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-black-deep border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/rh-logo-transparent.dim_400x400.png"
                alt="RH Freelancer"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <p className="font-serif font-bold text-off-white tracking-wide">
                  RH Freelancer
                </p>
                <p className="text-gold text-[10px] tracking-[0.3em] uppercase">
                  Design Studio
                </p>
              </div>
            </div>
            <p className="text-silver text-sm leading-relaxed">
              Premium design services at affordable prices. Satkania,
              Chattogram.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-off-white font-bold tracking-[0.2em] uppercase text-xs mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {["Home", "Services", "About", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => scrollTo(`#${item.toLowerCase()}`)}
                    className="text-silver hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-off-white font-bold tracking-[0.2em] uppercase text-xs mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:anas2010@gmail.com"
                  className="text-silver text-sm hover:text-gold transition-colors"
                >
                  anas2010@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-silver text-sm">
                  Satkania, Chattogram
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   WHATSAPP FLOATING BUTTON
═══════════════════════════════════════════════ */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8801629066833"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[oklch(0.52_0.22_145)] flex items-center justify-center shadow-[0_4px_20px_oklch(0_0_0/0.4)] whatsapp-pulse hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}

/* ═══════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════ */
export default function RHFreelancerPage() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null,
  );

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection onOrderService={setSelectedService} />
        <AboutSection />
        <WhyChooseSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ServiceOrderModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}
