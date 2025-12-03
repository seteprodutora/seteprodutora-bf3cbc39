const HeroSection = () => {
  return (
    <section 
      className="h-screen flex items-center justify-center text-center relative"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-5">
        <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-5 font-oswald animate-fade-in-up">
          SUA CARREIRA EM <br />
          <span className="text-gold">360 GRAUS</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Deixe a burocracia, a venda e a estratégia com a gente. <br />
          Você só precisa fazer uma coisa: <strong className="text-foreground">Ser o Artista.</strong>
        </p>
        <a href="#pilares" className="btn-gold animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Conheça o Método 7
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
