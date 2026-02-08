import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { 
  Brain,
  Scale,
  Music,
  Palette,
  Megaphone,
  HandshakeIcon,
  Map,
  Target,
  Heart,
  Lightbulb,
  ArrowRight
} from "lucide-react";

const services = [
  { icon: Brain, title: "Psicologia", description: "Acompanhamento para lidar com pressão, bloqueios criativos e ansiedade." },
  { icon: Scale, title: "Jurídico", description: "Contratos, direitos autorais, ECAD e proteção legal completa." },
  { icon: Music, title: "Produção", description: "Gravação, mixagem e masterização com qualidade profissional." },
  { icon: Palette, title: "Branding", description: "Identidade visual, posicionamento e imagem que conecta." },
  { icon: Megaphone, title: "Marketing", description: "Tráfego pago, redes sociais e estratégias de alcance." },
  { icon: HandshakeIcon, title: "Vendas", description: "Negociação de shows, eventos e parcerias comerciais." },
  { icon: Map, title: "Planejamento", description: "Mapa estratégico de carreira com metas e prazos definidos." },
];

const values = [
  {
    icon: Target,
    title: "Foco no Artista",
    description: "Nosso objetivo é simples: deixar você livre para criar. Cuidamos de todo o resto.",
  },
  {
    icon: Heart,
    title: "Parceria Verdadeira",
    description: "Não somos apenas prestadores de serviço. Somos parceiros no seu sucesso.",
  },
  {
    icon: Lightbulb,
    title: "Inovação Constante",
    description: "O mercado muda rápido. Estamos sempre à frente para manter você competitivo.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-5">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald mb-6 animate-fade-in-up">
                SOBRE A <span className="text-gold">7 PRODUTORA</span>
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Somos uma empresa de gestão 360° dedicada a transformar talentos em carreiras de sucesso. 
                Nossa missão é cuidar de tudo para que você só precise fazer uma coisa: ser artista.
              </p>
            </div>
          </div>
        </section>

        {/* O Que Entregamos */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-oswald text-center mb-10">
              O QUE <span className="text-gold">ENTREGAMOS</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={service.title} 
                    className="bg-card rounded-xl p-5 border border-border text-center animate-fade-in-up hover:border-primary/50 transition-colors"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-oswald text-gold mb-2">{service.title}</h3>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-20">
          <div className="container mx-auto px-5">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-oswald mb-6">
                  NOSSA <span className="text-gold">HISTÓRIA</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A 7 Produtora nasceu de uma percepção simples: artistas independentes não 
                    falham por falta de talento, mas por exaustão. Quando você tenta ser 
                    compositor, produtor, gestor, advogado e social media ao mesmo tempo, 
                    não sobra energia para ser artista.
                  </p>
                  <p>
                    Com uma metodologia própria baseada em 7 pilares essenciais, criamos 
                    a estrutura que faltava para artistas independentes. Uma equipe 
                    completa, trabalhando nos bastidores, para que o talento possa 
                    brilhar no palco.
                  </p>
                  <p>
                    Nossa missão é cuidar de cada detalhe da sua carreira: da estratégia 
                    de lançamento ao contrato do próximo show, da identidade visual ao 
                    suporte psicológico.
                  </p>
                </div>
              </div>
              
              <div className="bg-card rounded-2xl p-8 border border-border">
                <blockquote className="text-xl italic text-foreground mb-4">
                  "Deixe a burocracia, a venda e a estratégia com a gente. 
                  Você só precisa fazer uma coisa: Ser o Artista."
                </blockquote>
                <cite className="text-gold font-oswald">— 7 PRODUTORA</cite>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-oswald text-center mb-12">
              NOSSOS <span className="text-gold">VALORES</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div 
                    key={value.title}
                    className="bg-background rounded-2xl p-8 border border-border text-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-oswald mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Metodologia */}
        <section className="py-20">
          <div className="container mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-oswald text-center mb-12">
              COMO <span className="text-gold">TRABALHAMOS</span>
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Diagnóstico",
                    description: "Analisamos seu momento atual, seus objetivos e as oportunidades do mercado.",
                  },
                  {
                    step: "02",
                    title: "Planejamento",
                    description: "Criamos uma estratégia personalizada para sua carreira, com metas claras e prazos definidos.",
                  },
                  {
                    step: "03",
                    title: "Execução",
                    description: "Nossa equipe cuida de tudo: jurídico, marketing, vendas, produção e muito mais.",
                  },
                  {
                    step: "04",
                    title: "Crescimento",
                    description: "Acompanhamos os resultados, ajustamos a estratégia e escalamos seu sucesso.",
                  },
                ].map((item, index) => (
                  <div 
                    key={item.step}
                    className="flex gap-6 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-gold font-oswald">{item.step}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-oswald mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-5 text-center">
            <h2 className="text-3xl md:text-4xl font-oswald mb-6">
              PRONTO PARA <span className="text-gold">COMEÇAR?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Seja você um artista buscando gestão profissional ou um contratante procurando 
              talentos, estamos prontos para ajudar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/seja-artista">
                <Button className="btn-gold">
                  QUERO SER ARTISTA
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/casting">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  VER CASTING
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
