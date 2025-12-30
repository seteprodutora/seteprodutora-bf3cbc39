import { Link } from "react-router-dom";
import { Users, Briefcase } from "lucide-react";
import logo from "@/assets/logo.png";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header simples */}
      <header className="py-6 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-5 flex justify-center">
          <img src={logo} alt="7 Produtora" className="h-14 md:h-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-5">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-oswald mb-4 animate-fade-in-up">
              COMO PODEMOS <span className="text-gold">AJUDAR VOCÊ?</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Selecione o seu perfil para continuar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card Artista */}
            <Link
              to="/seja-artista"
              className="group relative overflow-hidden rounded-3xl p-8 md:p-10 bg-card border border-border hover:border-primary transition-all duration-400 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              
              <div className="relative z-10 flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                
                <div>
                  <h2 className="text-2xl md:text-3xl font-oswald mb-3 text-foreground group-hover:text-gold transition-colors duration-300">
                    SOU ARTISTA
                  </h2>
                  <p className="text-muted-foreground text-base">
                    Quero fazer parte do casting e impulsionar minha carreira
                  </p>
                </div>

                <div className="btn-gold py-3 px-8 text-sm group-hover:shadow-[var(--shadow-primary-hover)]">
                  SAIBA MAIS
                </div>
              </div>
            </Link>

            {/* Card Contratante */}
            <Link
              to="/casting"
              className="group relative overflow-hidden rounded-3xl p-8 md:p-10 bg-card border border-border hover:border-primary transition-all duration-400 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              
              <div className="relative z-10 flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Briefcase className="w-10 h-10 text-primary" />
                </div>
                
                <div>
                  <h2 className="text-2xl md:text-3xl font-oswald mb-3 text-foreground group-hover:text-gold transition-colors duration-300">
                    SOU CONTRATANTE
                  </h2>
                  <p className="text-muted-foreground text-base">
                    Quero encontrar talentos para meu projeto
                  </p>
                </div>

                <div className="btn-gold py-3 px-8 text-sm group-hover:shadow-[var(--shadow-primary-hover)]">
                  VER CASTING
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
