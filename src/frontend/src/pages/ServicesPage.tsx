import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Code2,
  Globe,
  Search,
  ShoppingCart,
} from "lucide-react";
import type React from "react";
import ScrollReveal from "../components/ScrollReveal";
import { useServices } from "../hooks/useQueries";

const fallbackServices = [
  {
    id: 1n,
    iconName: "Globe",
    title: "Web Design",
    description:
      "We create stunning, user-centric websites that captivate visitors and convert them into loyal customers. Every design is crafted with purpose, balancing aesthetics with functionality.",
    features: [
      "Custom UI/UX Design & Wireframing",
      "Mobile-First Responsive Design",
      "Brand Identity & Style Guides",
      "Figma & Adobe XD Prototypes",
      "Accessibility (WCAG 2.1) Compliant",
      "A/B Testing & Conversion Optimization",
    ],
    displayOrder: 1n,
  },
  {
    id: 2n,
    iconName: "Code2",
    title: "Web Development",
    description:
      "We build fast, secure, and scalable web applications powered by the latest technologies. From simple landing pages to complex web platforms, we deliver clean, maintainable code.",
    features: [
      "React, Next.js & Vue.js Development",
      "Node.js & Python Backend",
      "RESTful & GraphQL APIs",
      "Database Design & Optimization",
      "Performance & Speed Optimization",
      "Security Hardening & SSL Setup",
    ],
    displayOrder: 2n,
  },
  {
    id: 3n,
    iconName: "ShoppingCart",
    title: "E-Commerce Website",
    description:
      "Launch a powerful online store that drives sales 24/7. We build feature-rich e-commerce solutions with seamless checkout experiences, inventory management, and payment integration.",
    features: [
      "Shopify, WooCommerce & Custom Builds",
      "Multi-Payment Gateway Integration",
      "Inventory & Order Management",
      "Product Catalog & Search",
      "Abandoned Cart Recovery",
      "Analytics & Sales Reporting",
    ],
    displayOrder: 3n,
  },
  {
    id: 4n,
    iconName: "Search",
    title: "SEO Services",
    description:
      "Dominate search engine rankings and drive sustainable organic traffic. Our data-driven SEO strategies combine technical excellence with compelling content to grow your visibility.",
    features: [
      "Technical SEO Audit & Fixes",
      "Keyword Research & Strategy",
      "On-Page & Off-Page Optimization",
      "Content Strategy & Creation",
      "Local SEO & Google My Business",
      "Monthly Performance Reporting",
    ],
    displayOrder: 4n,
  },
];

function ServiceIcon({ name, size = 32 }: { name: string; size?: number }) {
  const icons: Record<string, React.ReactElement> = {
    Globe: <Globe size={size} className="text-gold" />,
    Code2: <Code2 size={size} className="text-gold" />,
    ShoppingCart: <ShoppingCart size={size} className="text-gold" />,
    Search: <Search size={size} className="text-gold" />,
  };
  return icons[name] || <Globe size={size} className="text-gold" />;
}

export default function ServicesPage() {
  const { data: services } = useServices();
  const displayServices =
    services && services.length > 0 ? services : fallbackServices;

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-navy-800 border-b border-navy-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label">What We Offer</p>
            <h1 className="section-title text-5xl md:text-6xl mt-2">
              OUR SERVICES
            </h1>
            <div className="w-16 h-0.5 bg-primary mt-4" />
            <p className="text-muted-foreground mt-6 max-w-xl">
              Comprehensive digital solutions designed to grow your business
              online. Every service is tailored to deliver measurable results.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {displayServices.map((service, i) => (
              <ScrollReveal key={String(service.id)}>
                <div
                  data-ocid={`services.item.${i + 1}`}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-20 h-20 bg-navy-700 border border-gold flex items-center justify-center mb-6 gold-glow-sm">
                      <ServiceIcon name={service.iconName} size={36} />
                    </div>
                    <h2 className="section-title text-3xl md:text-4xl mb-4">
                      {service.title.toUpperCase()}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <Link
                      to="/contact"
                      data-ocid={`service.${i + 1}.primary_button`}
                      className="btn-gold"
                    >
                      Get Started <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div
                    className={`bg-navy-700 border border-navy-600 p-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                  >
                    <h3 className="text-gold font-bold uppercase tracking-widest text-sm mb-6">
                      ✦ What&apos;s Included
                    </h3>
                    <ul className="space-y-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-primary/20 border border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} className="text-gold" />
                          </div>
                          <span className="text-white text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="section-label">Why Us</p>
              <h2 className="section-title text-4xl md:text-5xl">
                WHY CHOOSE US
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Results-Driven",
                desc: "We focus on metrics that matter — traffic, leads, and revenue. Every decision is backed by data.",
                num: "01",
              },
              {
                title: "Transparent Process",
                desc: "Real-time project updates, clear timelines, and no hidden costs. You're always in the loop.",
                num: "02",
              },
              {
                title: "Ongoing Support",
                desc: "We don't disappear after launch. Dedicated support and maintenance to keep your site performing.",
                num: "03",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div
                  data-ocid={`why.item.${i + 1}`}
                  className="bg-navy-700 border border-navy-600 p-8 hover:border-gold transition-colors"
                >
                  <div className="text-6xl font-black text-gold/20 mb-4">
                    {item.num}
                  </div>
                  <h3 className="text-white font-bold uppercase tracking-wider text-lg mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-900 border-t border-navy-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="section-title text-4xl mb-6">
              READY TO GET STARTED?
            </h2>
            <p className="text-muted-foreground mb-8">
              Contact us today for a free consultation and custom quote.
            </p>
            <Link
              to="/contact"
              data-ocid="services.cta.primary_button"
              className="btn-gold"
            >
              Get a Free Quote <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
