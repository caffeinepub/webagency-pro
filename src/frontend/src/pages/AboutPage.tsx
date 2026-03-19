import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Clock,
  Eye,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

const team = [{ name: "Anas", role: "Founder & Card Designer", image: "AN" }];

const stats = [
  { icon: Award, label: "Projects Completed", value: "150+" },
  { icon: Users, label: "Happy Clients", value: "80+" },
  { icon: TrendingUp, label: "Avg. Traffic Increase", value: "300%" },
  { icon: Clock, label: "Years Experience", value: "8+" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-navy-800 border-b border-navy-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label">Who We Are</p>
            <h1 className="section-title text-5xl md:text-6xl mt-2">
              ABOUT US
            </h1>
            <div className="w-16 h-0.5 bg-primary mt-4" />
          </ScrollReveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <img
                  src="/assets/generated/about-team.dim_800x600.jpg"
                  alt="RH Freelancer Team"
                  className="w-full object-cover border-2 border-gold gold-glow"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-navy-900/90 border-t border-gold p-5">
                  <p className="text-gold font-bold text-sm uppercase tracking-widest">
                    Our Team of Experts
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Passionate about digital excellence since 2016
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <p className="section-label">Our Story</p>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-1 h-16 bg-gold flex-shrink-0 mt-1" />
                  <h2 className="section-title text-4xl">
                    CRAFTING PREMIUM BUSINESS CARDS
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  RH Freelancer was founded with a simple mission: to provide
                  premium quality visiting cards at the lowest possible cost.
                  Based in Satkania, Chattogram, we help businesses and
                  professionals make a great first impression.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  We have served hundreds of satisfied clients across
                  Bangladesh, delivering beautifully designed business cards
                  that truly represent their brand identity.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our philosophy is simple: every card should tell a story. We
                  blend creative design with quality printing to produce
                  business cards that engage, impress, and inspire confidence.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy-800 border-y border-navy-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={stat.label} delay={i * 100}>
                  <div
                    data-ocid={`stats.item.${i + 1}`}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 bg-navy-700 border border-navy-600 group-hover:border-gold flex items-center justify-center mx-auto mb-4 transition-colors">
                      <Icon size={24} className="text-gold" />
                    </div>
                    <div className="text-4xl font-black text-gold">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-2">
                      {stat.label}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="section-label">Our Direction</p>
              <h2 className="section-title text-4xl md:text-5xl">
                MISSION & VISION
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal delay={100}>
              <div
                data-ocid="about.mission.card"
                className="bg-navy-700 border border-navy-600 p-10 hover:border-gold transition-colors"
              >
                <div className="w-16 h-16 bg-navy-800 border border-gold flex items-center justify-center mb-6">
                  <Target size={28} className="text-gold" />
                </div>
                <h3 className="text-white font-black uppercase tracking-wider text-2xl mb-4">
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide every business and professional with affordable,
                  premium quality visiting cards that create powerful first
                  impressions and reflect true brand identity.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div
                data-ocid="about.vision.card"
                className="bg-navy-700 border border-navy-600 p-10 hover:border-gold transition-colors"
              >
                <div className="w-16 h-16 bg-navy-800 border border-gold flex items-center justify-center mb-6">
                  <Eye size={28} className="text-gold" />
                </div>
                <h3 className="text-white font-black uppercase tracking-wider text-2xl mb-4">
                  Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted visiting card creator in Bangladesh —
                  recognized for exceptional design quality and unbeatable
                  affordability. We envision every professional having access to
                  world-class business cards.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="section-label">The People</p>
              <h2 className="section-title text-4xl md:text-5xl">
                MEET THE TEAM
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 100}>
                <div
                  data-ocid={`team.item.${i + 1}`}
                  className="bg-navy-700 border border-navy-600 p-6 text-center hover:border-gold transition-colors group"
                >
                  <div className="w-20 h-20 rounded-full bg-navy-800 border-2 border-gold flex items-center justify-center mx-auto mb-4 text-gold font-black text-xl group-hover:gold-glow">
                    {member.image}
                  </div>
                  <h3 className="text-white font-bold text-sm">
                    {member.name}
                  </h3>
                  <p className="text-gold text-xs uppercase tracking-wider mt-1">
                    {member.role}
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
              READY TO WORK TOGETHER?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss your project and create something extraordinary.
            </p>
            <Link
              to="/contact"
              data-ocid="about.cta.primary_button"
              className="btn-gold"
            >
              Start a Project <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
