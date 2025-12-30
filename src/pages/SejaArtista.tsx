import { Link } from "react-router-dom";
import { ArrowLeft, Star, TrendingUp, Users, Shield, Mic, Music, Headphones, Guitar } from "lucide-react";
import logo from "@/assets/logo.png";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const benefits = [
  {
    icon: TrendingUp,
    title: "Gestão de Carreira",
    description: "Planejamento estratégico completo para alavancar sua trajetória artística"
  },
  {
    icon: Users,
    title: "Networking",
    description: "Conexões com produtores, agências e marcas de renome no mercado"
  },
  {
    icon: Shield,
    title: "Suporte Jurídico",
    description: "Assessoria em contratos, direitos autorais e proteção da sua imagem"
  },
  {
    icon: Star,
    title: "Visibilidade",
    description: "Exposição nas principais plataformas e eventos do segmento"
  }
];

const services = [
  { icon: Mic, label: "Cantores" },
  { icon: Headphones, label: "DJs" },
  { icon: Music, label: "Músicos" },
  { icon: Guitar, label: "Bandas" },
  { icon: Users, label: "Influenciadores" }
];

const SejaArtista = () => {
  const whatsappNumber = "5511999999999";
  const whatsappMessage = encodeURIComponent("Olá! Tenho interesse em fazer parte do casting da 7 Produtora.");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full py-4 bg-background/95 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-5">
          <nav className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="7 Produtora" className="h-14 md:h-16" />
            </Link>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero */}
        <section 
          className="py-20 md:py-32 relative"
          style={{
            background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto px-5 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-oswald mb-6 animate-fade-in-up">
              FAÇA PARTE DO <span className="text-gold">NOSSO CASTING</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              A 7 Produtora é especializada em gestão de carreiras artísticas. 
              Cuidamos de tudo para que você foque apenas em ser o artista.
            </p>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              QUERO FAZER PARTE
            </a>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-oswald text-center mb-10">
              TRABALHAMOS COM
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {services.map((service, index) => (
                <div 
                  key={service.label}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-background border border-border"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <service.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium">{service.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-20">
          <div className="container mx-auto px-5">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-oswald mb-4">
                POR QUE A <span className="text-gold">7 PRODUTORA?</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Oferecemos uma gestão completa para sua carreira artística
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title}
                  className="card-pillar flex gap-5"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-oswald mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-5 text-center">
            <h2 className="text-3xl md:text-4xl font-oswald mb-6">
              PRONTO PARA <span className="text-gold">COMEÇAR?</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Entre em contato conosco e agende uma reunião para conhecer melhor nosso trabalho
            </p>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              AGENDAR REUNIÃO
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default SejaArtista;
