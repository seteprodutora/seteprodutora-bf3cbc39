const AboutSection = () => {
  const features = ['Psicologia', 'Jurídico', 'Produção', 'Branding', 'Vendas'];

  return (
    <section className="py-20 md:py-24" id="sobre">
      <div className="container mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Estúdio de Gravação"
              className="w-full rounded-lg"
              style={{
                boxShadow: '-20px 20px 0 hsl(var(--secondary)), -20px 20px 0 2px hsl(var(--primary))'
              }}
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl text-gold mb-5 font-oswald">
              Mais que uma produtora.<br />Uma gestora de sonhos.
            </h2>
            <p className="text-muted-foreground mb-5">
              Muitos artistas independentes falham não por falta de talento, mas por exaustão. Tentar ser compositor, produtor, advogado e social media ao mesmo tempo é a receita para o fracasso.
            </p>
            <p className="text-muted-foreground mb-5">
              A <strong className="text-foreground">7 Produtora</strong> assume todas as pontas soltas da sua carreira. Do acompanhamento com psicólogo para manter sua mente blindada, até a negociação de contratos complexos.
            </p>
            <p className="text-foreground font-semibold mb-8">
              Nós criamos a máquina para você pilotar o show.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {features.map((feature) => (
                <span key={feature} className="feature-tag">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
