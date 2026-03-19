import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ScrollReveal from "../components/ScrollReveal";
import { useSubmitContact } from "../hooks/useQueries";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const submitMutation = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitMutation.mutateAsync(form);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const inputClass =
    "bg-navy-700 border-navy-600 text-white placeholder:text-muted-foreground focus:border-gold focus:ring-gold rounded-none h-12";

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-navy-800 border-b border-navy-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label">Get In Touch</p>
            <h1 className="section-title text-5xl md:text-6xl mt-2">
              CONTACT US
            </h1>
            <div className="w-16 h-0.5 bg-primary mt-4" />
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="section-title text-4xl md:text-5xl">
                LET&apos;S BUILD SOMETHING{" "}
                <span className="text-gold">GREAT</span>
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal direction="left">
              <form
                data-ocid="contact.modal"
                onSubmit={handleSubmit}
                className="bg-navy-800 border border-navy-600 p-8"
              >
                <h3 className="text-white font-bold uppercase tracking-wider text-lg mb-6 border-b border-navy-600 pb-4">
                  Send Us a Message
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="contact-name"
                        data-ocid="contact.input"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="contact-email"
                        data-ocid="contact.input"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="contact-phone"
                        data-ocid="contact.input"
                        type="tel"
                        placeholder="01629066833"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block"
                      >
                        Subject
                      </label>
                      <Input
                        id="contact-subject"
                        data-ocid="contact.input"
                        placeholder="Business Card Design"
                        value={form.subject}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, subject: e.target.value }))
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="contact-message"
                      data-ocid="contact.textarea"
                      placeholder="Tell us about your project..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      className={`${inputClass} h-32 resize-none`}
                      required
                    />
                  </div>
                </div>
                {submitMutation.isError && (
                  <p
                    data-ocid="contact.error_state"
                    className="text-destructive text-sm mt-3"
                  >
                    Failed to send. Please try again.
                  </p>
                )}
                {submitMutation.isSuccess && (
                  <p
                    data-ocid="contact.success_state"
                    className="text-green-400 text-sm mt-3"
                  >
                    ✓ Message sent successfully!
                  </p>
                )}
                <Button
                  data-ocid="contact.submit_button"
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full mt-6 btn-gold border-0 h-12 rounded-none justify-center text-sm"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> SEND MESSAGE
                    </>
                  )}
                </Button>
              </form>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-bold uppercase tracking-wider text-lg mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-5">
                    {[
                      {
                        icon: Phone,
                        label: "Phone",
                        value: "01629066833",
                        href: "tel:+8801629066833",
                      },
                      {
                        icon: Mail,
                        label: "Email",
                        value: "anas2010@gmail.com",
                        href: "mailto:anas2010@gmail.com",
                      },
                      {
                        icon: MapPin,
                        label: "Address",
                        value: "Satkania, Chattogram",
                        href: "#",
                      },
                    ].map((info) => {
                      const Icon = info.icon;
                      return (
                        <a
                          key={info.label}
                          href={info.href}
                          className="flex items-start gap-5 group"
                        >
                          <div className="w-12 h-12 bg-navy-700 border border-navy-600 group-hover:border-gold flex items-center justify-center flex-shrink-0 transition-colors">
                            <Icon size={18} className="text-gold" />
                          </div>
                          <div>
                            <div className="text-xs text-gold font-bold uppercase tracking-wider mb-1">
                              {info.label}
                            </div>
                            <div className="text-white whitespace-pre-line text-sm">
                              {info.value}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-navy-700 border border-navy-600 p-6">
                  <h4 className="text-gold font-bold uppercase tracking-wider text-sm mb-4">
                    Business Hours
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      {
                        day: "Saturday – Thursday",
                        hours: "9:00 AM – 6:00 PM",
                      },
                      { day: "Friday", hours: "Closed" },
                    ].map((h) => (
                      <div key={h.day} className="flex justify-between">
                        <span className="text-muted-foreground">{h.day}</span>
                        <span className="text-white font-medium">
                          {h.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-navy-700 border border-navy-600 overflow-hidden">
                  <div className="aspect-video flex items-center justify-center bg-navy-800">
                    <div className="text-center">
                      <MapPin size={40} className="text-gold mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">
                        Satkania, Chattogram
                      </p>
                      <a
                        href="https://maps.google.com/?q=Satkania,Chattogram"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-gold text-xs uppercase tracking-wider hover:underline"
                      >
                        Open in Google Maps →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
