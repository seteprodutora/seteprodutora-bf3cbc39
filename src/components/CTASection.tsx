import { toast } from "@/hooks/use-toast";

const CTASection = () => {
  const handleClick = () => {
    toast({
      title: "Em breve!",
      description: "Link para o WhatsApp da 7 Produtora seria aberto aqui!",
    });
  };

  return (
    <section 
      className="py-20 md:py-24 text-center" 
      id="contato"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-oswald mb-3">
          PRONTO PARA PROFISSIONALIZAR SUA ARTE?
        </h2>
        <p className="text-muted-foreground mb-8">
          Agende um diagnóstico de carreira com nossa equipe.
        </p>
        <button className="btn-gold" onClick={handleClick}>
          Quero Agendar Reunião
        </button>
      </div>
    </section>
  );
};

export default CTASection;
