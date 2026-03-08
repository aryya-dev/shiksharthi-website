import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "919836269282";
  const message = "Hello Shiksharthi, I want to know more about your programs.";
  const encodedMessage = encodeURIComponent(message);

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50
                 h-14 w-14 rounded-full
                 flex items-center justify-center
                 shadow-xl
                 bg-green-500 text-white
                 transition-all duration-300
                 hover:scale-110 hover:shadow-2xl"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}