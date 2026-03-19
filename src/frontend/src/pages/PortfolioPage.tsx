import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { Category } from "../backend";
import ScrollReveal from "../components/ScrollReveal";
import { usePortfolioItems } from "../hooks/useQueries";

type FilterCategory = "all" | Category;

const fallbackPortfolio = [
  {
    id: 1n,
    title: "LuxeShop E-Commerce Platform",
    category: Category.ecommerce,
    imageUrl: "/assets/generated/portfolio-ecommerce.dim_800x600.jpg",
    clientName: "LuxeShop Inc.",
    completionYear: 2024n,
    description:
      "Full-featured e-commerce platform with 500+ products, multi-currency support, and custom inventory management.",
    projectUrl: "#",
  },
  {
    id: 2n,
    title: "Nexus Corporate Website",
    category: Category.web_design,
    imageUrl: "/assets/generated/portfolio-corporate.dim_800x600.jpg",
    clientName: "Nexus Corp",
    completionYear: 2024n,
    description:
      "Premium corporate website with interactive animations, careers portal, and investor relations section.",
    projectUrl: "#",
  },
  {
    id: 3n,
    title: "Saveur Restaurant",
    category: Category.web_design,
    imageUrl: "/assets/generated/portfolio-restaurant.dim_800x600.jpg",
    clientName: "Saveur Bistro",
    completionYear: 2023n,
    description:
      "Elegant restaurant website with online reservation system, menu management, and events calendar.",
    projectUrl: "#",
  },
  {
    id: 4n,
    title: "Prime Properties Portal",
    category: Category.web_development,
    imageUrl: "/assets/generated/portfolio-realestate.dim_800x600.jpg",
    clientName: "Prime Realty Group",
    completionYear: 2024n,
    description:
      "Advanced real estate platform with map-based search, virtual tours, and agent management system.",
    projectUrl: "#",
  },
  {
    id: 5n,
    title: "DataStream Analytics",
    category: Category.web_development,
    imageUrl: "/assets/generated/portfolio-saas.dim_800x600.jpg",
    clientName: "DataStream Inc.",
    completionYear: 2023n,
    description:
      "Enterprise SaaS dashboard with real-time analytics, custom reporting, and 10,000+ active users.",
    projectUrl: "#",
  },
  {
    id: 6n,
    title: "TechStore SEO Campaign",
    category: Category.seo,
    imageUrl: "/assets/generated/portfolio-ecommerce.dim_800x600.jpg",
    clientName: "TechStore BD",
    completionYear: 2024n,
    description:
      "Comprehensive SEO campaign achieving page 1 rankings for 25+ competitive keywords, 400% traffic increase.",
    projectUrl: "#",
  },
];

const filters: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  { label: "Web Design", value: Category.web_design },
  { label: "Web Development", value: Category.web_development },
  { label: "E-Commerce", value: Category.ecommerce },
  { label: "SEO", value: Category.seo },
];

function categoryLabel(cat: Category): string {
  const labels: Record<Category, string> = {
    [Category.web_design]: "Web Design",
    [Category.web_development]: "Web Development",
    [Category.ecommerce]: "E-Commerce",
    [Category.seo]: "SEO",
  };
  return labels[cat] || cat;
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const { data: portfolioItems } = usePortfolioItems();

  const items =
    portfolioItems && portfolioItems.length > 0
      ? portfolioItems
      : fallbackPortfolio;
  const filtered =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-navy-800 border-b border-navy-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label">Our Work</p>
            <h1 className="section-title text-5xl md:text-6xl mt-2">
              PORTFOLIO
            </h1>
            <div className="w-16 h-0.5 bg-primary mt-4" />
            <p className="text-muted-foreground mt-6 max-w-xl">
              A showcase of projects where we've transformed ideas into powerful
              digital experiences.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter.value}
                data-ocid="portfolio.filter.tab"
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                  activeFilter === filter.value
                    ? "bg-primary text-primary-foreground gold-glow-sm"
                    : "bg-navy-700 border border-navy-600 text-muted-foreground hover:border-gold hover:text-gold"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div
              data-ocid="portfolio.empty_state"
              className="text-center py-20"
            >
              <p className="text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <ScrollReveal key={String(item.id)} delay={i * 80}>
                  <div
                    data-ocid={`portfolio.item.${i + 1}`}
                    className="group bg-navy-700 border border-navy-600 hover:border-gold transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={
                          item.imageUrl ||
                          "/assets/generated/portfolio-corporate.dim_800x600.jpg"
                        }
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <a
                          href={item.projectUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-primary flex items-center justify-center gold-glow"
                          aria-label={`View ${item.title}`}
                        >
                          <ExternalLink
                            size={18}
                            className="text-primary-foreground"
                          />
                        </a>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1">
                          {categoryLabel(item.category)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-white font-bold text-lg mb-1 group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gold text-xs uppercase tracking-wider mb-3">
                        {item.clientName} · {String(item.completionYear)}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
