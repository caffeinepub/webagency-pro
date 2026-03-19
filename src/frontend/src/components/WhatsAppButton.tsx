import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "8801629066833";
  const message = encodeURIComponent(
    "Hello! I'm interested in your business card services.",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} fill="white" color="white" />
    </a>
  );
}
