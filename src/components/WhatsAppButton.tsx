import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "5511964360431";
  const message = encodeURIComponent("Olá! Vim pelo site e gostaria de saber mais sobre a 7 Produtora.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
    </a>
  );
};

export default WhatsAppButton;
