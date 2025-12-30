import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface Artist {
  id: string;
  name: string;
  slug: string;
  profile_image: string | null;
}

const Casting = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      const { data, error } = await supabase
        .from("artists")
        .select("id, name, slug, profile_image")
        .eq("is_visible", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setArtists(data);
      }
      setIsLoading(false);
    };

    fetchArtists();
  }, []);

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
        <section className="py-16 bg-card">
          <div className="container mx-auto px-5 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald mb-4 animate-fade-in-up">
              NOSSO <span className="text-gold">CASTING</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Conheça os talentos que fazem parte da 7 Produtora e encontre o artista ideal para o seu projeto
            </p>
          </div>
        </section>

        {/* Grid de Artistas */}
        <section className="py-16">
          <div className="container mx-auto px-5">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : artists.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  Nenhum artista disponível no momento.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {artists.map((artist, index) => (
                  <Link
                    key={artist.id}
                    to={`/artistas/${artist.slug}`}
                    className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-card animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {artist.profile_image ? (
                      <img
                        src={artist.profile_image}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <span className="text-4xl font-bold text-muted-foreground">
                          {artist.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Name */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-semibold text-foreground text-center">
                          {artist.name}
                        </h3>
                      </div>
                    </div>

                    {/* Hover border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-2xl transition-colors duration-300" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-5 text-center">
            <h2 className="text-2xl md:text-3xl font-oswald mb-4">
              NÃO ENCONTROU O QUE PROCURA?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Entre em contato e conte-nos sobre seu projeto. Podemos ajudá-lo a encontrar o talento ideal.
            </p>
            <a 
              href="https://wa.me/5511999999999?text=Olá! Estou procurando artistas para um projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              FALAR COM A EQUIPE
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Casting;
