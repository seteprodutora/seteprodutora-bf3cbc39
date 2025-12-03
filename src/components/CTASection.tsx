const CTASection = () => {
  const whatsappNumber = "5511964360431";
  const message = encodeURIComponent("Olá! Vim pelo site e gostaria de agendar um diagnóstico de carreira com a 7 Produtora.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

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
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold inline-block"
        >
          Quero Agendar Reunião
        </a>
      </div>
    </section>
  );
};

export default CTASection;
