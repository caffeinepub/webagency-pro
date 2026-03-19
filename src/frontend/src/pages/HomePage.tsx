import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Code2,
  Globe,
  Search,
  ShoppingCart,
  Star,
} from "lucide-react";
import type React from "react";
import { Category } from "../backend";
import ScrollReveal from "../components/ScrollReveal";
import { usePortfolioItems, useServices } from "../hooks/useQueries";

const fallbackServices = [
  {
    id: 1n,
    iconName: "Globe",
    title: "Web Design",
    description:
      "Stunning, conversion-focused designs that captivate your audience and reinforce your brand identity.",
    features: [
      "Custom UI/UX Design",
      "Mobile-First Approach",
      "Brand Identity",
    ],
  },
  {
    id: 2n,
    iconName: "Code2",
    title: "Web Development",
    description:
      "Fast, secure, and scalable web applications built with cutting-edge technologies.",
    features: ["React & Next.js", "Node.js Backend", "API Integration"],
  },
  {
    id: 3n,
    iconName: "ShoppingCart",
    title: "E-Commerce",
    description:
      "Powerful online stores that drive sales, with seamless checkout and inventory management.",
    features: ["Shopify & WooCommerce", "Payment Gateway", "Inventory System"],
  },
  {
    id: 4n,
    iconName: "Search",
    title: "SEO Services",
    description:
      "Dominate search rankings and drive organic traffic with our proven SEO strategies.",
    features: ["On-Page SEO", "Technical SEO", "Content Strategy"],
  },
];

const fallbackPortfolio = [
  {
    id: 1n,
    title: "LuxeShop E-Commerce",
    category: Category.ecommerce,
    imageUrl: "/assets/generated/portfolio-ecommerce.dim_800x600.jpg",
    clientName: "LuxeShop Inc.",
    completionYear: 2024n,
    description: "Premium e-commerce platform",
    projectUrl: "#",
  },
  {
    id: 2n,
    title: "Nexus Corporate Site",
    category: Category.web_design,
    imageUrl: "/assets/generated/portfolio-corporate.dim_800x600.jpg",
    clientName: "Nexus Corp",
    completionYear: 2024n,
    description: "Corporate web design",
    projectUrl: "#",
  },
  {
    id: 3n,
    title: "Saveur Restaurant",
    category: Category.web_design,
    imageUrl: "/assets/generated/portfolio-restaurant.dim_800x600.jpg",
    clientName: "Saveur Bistro",
    completionYear: 2023n,
    description: "Restaurant website",
    projectUrl: "#",
  },
  {
    id: 4n,
    title: "Prime Properties",
    category: Category.web_development,
    imageUrl: "/assets/generated/portfolio-realestate.dim_800x600.jpg",
    clientName: "Prime Realty",
    completionYear: 2024n,
    description: "Real estate platform",
    projectUrl: "#",
  },
  {
    id: 5n,
    title: "SaaS Analytics Dashboard",
    category: Category.web_development,
    imageUrl: "/assets/generated/portfolio-saas.dim_800x600.jpg",
    clientName: "DataStream",
    completionYear: 2023n,
    description: "Analytics platform",
    projectUrl: "#",
  },
  {
    id: 6n,
    title: "TechStore SEO Campaign",
    category: Category.seo,
    imageUrl: "/assets/generated/portfolio-ecommerce.dim_800x600.jpg",
    clientName: "TechStore BD",
    completionYear: 2024n,
    description: "SEO optimization",
    projectUrl: "#",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechVision",
    text: "RH Freelancer made us the most elegant business cards. Truly professional quality at an unbeatable price!",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "Founder, EcoMart",
    text: "Outstanding visiting cards! RH Freelancer delivered exactly what we needed. Our clients are always impressed.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Marketing Director, FinServe",
    text: "Our SEO rankings skyrocketed to page 1 for 15 competitive keywords within 3 months. Outstanding results!",
    rating: 5,
  },
];

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactElement> = {
    Globe: <Globe size={28} className="text-gold" />,
    Code2: <Code2 size={28} className="text-gold" />,
    ShoppingCart: <ShoppingCart size={28} className="text-gold" />,
    Search: <Search size={28} className="text-gold" />,
  };
  return icons[name] || <Globe size={28} className="text-gold" />;
}

function categoryLabel(cat: Category): string {
  const labels: Record<Category, string> = {
    [Category.web_design]: "Web Design",
    [Category.web_development]: "Web Development",
    [Category.ecommerce]: "E-Commerce",
    [Category.seo]: "SEO",
  };
  return labels[cat] || cat;
}

export default function HomePage() {
  const { data: services } = useServices();
  const { data: portfolio } = usePortfolioItems();

  const displayServices =
    services && services.length > 0 ? services.slice(0, 4) : fallbackServices;
  const displayPortfolio =
    portfolio && portfolio.length > 0
      ? portfolio.slice(0, 6)
      : fallbackPortfolio;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 bg-navy-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <ScrollReveal delay={100}>
              <p className="section-label mb-4">
                ✦ Premium Visiting Card Creator
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-tight mb-6">
                <span className="text-gold">PREMIUM</span>{" "}
                <span className="text-white">BUSINESS</span>
                <br />
                <span className="text-white">CARDS</span>
                <br />
                <span className="text-gold">MADE</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
                Low cost business cards are made for your business. Premium
                quality visiting cards crafted to make lasting impressions.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  data-ocid="hero.primary_button"
                  className="btn-gold text-sm"
                >
                  GET A FREE CONSULTATION <ArrowRight size={16} />
                </Link>
                <Link
                  to="/portfolio"
                  data-ocid="hero.secondary_button"
                  className="px-8 py-3 border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:border-gold hover:text-gold transition-all duration-300 inline-flex items-center gap-2"
                >
                  VIEW OUR WORK <ChevronRight size={16} />
                </Link>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={500}>
              <div className="mt-14 flex flex-wrap gap-10">
                {[
                  { label: "Projects Completed", value: "150+" },
                  { label: "Happy Clients", value: "80+" },
                  { label: "Years Experience", value: "8+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-black text-gold">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="section-label">What We Do</p>
              <h2 className="section-title text-4xl md:text-5xl">
                OUR SERVICES
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayServices.map((service, i) => (
              <ScrollReveal key={String(service.id)} delay={i * 100}>
                <div
                  data-ocid={`services.item.${i + 1}`}
                  className="bg-navy-700 border border-navy-600 p-8 group hover:border-gold transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-navy-800 border border-navy-600 group-hover:border-gold flex items-center justify-center mb-6 transition-colors">
                    <ServiceIcon name={service.iconName} />
                  </div>
                  <h3 className="text-white font-bold uppercase tracking-wide text-lg mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Link
                to="/services"
                data-ocid="services.primary_button"
                className="btn-gold"
              >
                Explore All Services <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="section-label">Our Work</p>
              <h2 className="section-title text-4xl md:text-5xl">
                RECENT WORKS
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPortfolio.map((item, i) => (
              <ScrollReveal key={String(item.id)} delay={i * 80}>
                <div
                  data-ocid={`portfolio.item.${i + 1}`}
                  className="group relative overflow-hidden aspect-video bg-navy-700"
                >
                  <img
                    src={
                      item.imageUrl ||
                      "/assets/generated/portfolio-corporate.dim_800x600.jpg"
                    }
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-xs text-gold font-bold uppercase tracking-widest mb-1">
                      {categoryLabel(item.category)}
                    </span>
                    <h3 className="text-white font-bold text-lg">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-xs mt-1">
                      {item.clientName} · {String(item.completionYear)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Link
                to="/portfolio"
                data-ocid="portfolio.primary_button"
                className="btn-gold"
              >
                VIEW ALL PORTFOLIO <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <img
                  src="/assets/generated/about-team.dim_800x600.jpg"
                  alt="Our team"
                  className="w-full object-cover border-2 border-gold gold-glow"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-navy-900/90 border-t border-gold p-4">
                  <p className="text-gold font-bold text-sm uppercase tracking-widest">
                    Expert Team of 12+
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Designers, Developers & Digital Strategists
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <p className="section-label">Who We Are</p>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-1 h-16 bg-gold flex-shrink-0 mt-1" />
                  <h2 className="section-title text-4xl md:text-5xl">
                    OUR STORY
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  RH Freelancer is a premium visiting card creator based in
                  Satkania, Chattogram. We specialize in designing and printing
                  stunning business cards at the lowest cost without
                  compromising quality.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Every card we create is a masterpiece — crafted to help
                  professionals and businesses make a lasting first impression.
                </p>
                <Link
                  to="/about"
                  data-ocid="about.primary_button"
                  className="btn-gold"
                >
                  Learn More About Us <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="section-label">Client Reviews</p>
              <h2 className="section-title text-4xl md:text-5xl">
                WHAT CLIENTS SAY
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div
                  data-ocid={`testimonials.item.${i + 1}`}
                  className="bg-navy-700 border border-navy-600 p-8 hover:border-gold transition-colors"
                >
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].slice(0, t.rating).map((n) => (
                      <Star key={n} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-gold text-xs uppercase tracking-wider mt-1">
                      {t.role}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-navy-900 border-y border-gold/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="section-title text-4xl md:text-5xl mb-6">
              LET&apos;S BUILD SOMETHING{" "}
              <span className="text-gold">GREAT</span>
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Ready to get your premium business cards? Contact us today for the
              best price.
            </p>
            <Link
              to="/contact"
              data-ocid="cta.primary_button"
              className="btn-gold text-base px-12 py-4"
            >
              GET STARTED TODAY <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
