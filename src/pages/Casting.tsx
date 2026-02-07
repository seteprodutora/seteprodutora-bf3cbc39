import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ArtistFilters from "@/components/ArtistFilters";
import { Badge } from "@/components/ui/badge";

interface Artist {
  id: string;
  name: string;
  slug: string;
  profile_image: string | null;
  category: string | null;
  city: string | null;
  state: string | null;
  genres: string[] | null;
}

const categoryLabels: Record<string, string> = {
  cantor: "Cantor(a)",
  dj: "DJ",
  musico: "Músico",
  banda: "Banda",
  influenciador: "Influenciador(a)",
};

const Casting = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    const fetchArtists = async () => {
      const { data, error } = await supabase
        .from("artists")
        .select("id, name, slug, profile_image, category, city, state, genres")
        .eq("is_visible", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setArtists(data);
      }
      setIsLoading(false);
    };

    fetchArtists();
  }, []);

  // Extract unique genres from all artists
  const availableGenres = useMemo(() => {
    const genresSet = new Set<string>();
    artists.forEach((artist) => {
      artist.genres?.forEach((genre) => genresSet.add(genre));
    });
    return Array.from(genresSet).sort();
  }, [artists]);

  // Filter artists
  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      const matchesSearch = artist.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || artist.category === selectedCategory;
      const matchesState =
        selectedState === "all" || artist.state === selectedState;
      const matchesGenre =
        selectedGenre === "all" ||
        artist.genres?.includes(selectedGenre);

      return matchesSearch && matchesCategory && matchesState && matchesGenre;
    });
  }, [artists, searchTerm, selectedCategory, selectedState, selectedGenre]);

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCategory !== "all" ||
    selectedState !== "all" ||
    selectedGenre !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedState("all");
    setSelectedGenre("all");
  };

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
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Conheça os talentos que fazem parte da 7 Produtora e encontre o
              artista ideal para o seu projeto
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-5">
            <ArtistFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedState={selectedState}
              onStateChange={setSelectedState}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
              availableGenres={availableGenres}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </section>

        {/* Grid de Artistas */}
        <section className="py-16">
          <div className="container mx-auto px-5">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : filteredArtists.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  {hasActiveFilters
                    ? "Nenhum artista encontrado com os filtros selecionados."
                    : "Nenhum artista disponível no momento."}
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  {filteredArtists.length} artista
                  {filteredArtists.length !== 1 ? "s" : ""} encontrado
                  {filteredArtists.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredArtists.map((artist, index) => (
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

                      {/* Category Badge */}
                      {artist.category && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary/80 text-primary-foreground text-xs">
                            {categoryLabels[artist.category] || artist.category}
                          </Badge>
                        </div>
                      )}

                      {/* Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-semibold text-foreground text-center">
                            {artist.name}
                          </h3>
                          {artist.city && artist.state && (
                            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {artist.city}, {artist.state}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Hover border */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-2xl transition-colors duration-300" />
                    </Link>
                  ))}
                </div>
              </>
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
              Entre em contato e conte-nos sobre seu projeto. Podemos ajudá-lo a
              encontrar o talento ideal.
            </p>
            <Link to="/contato" className="btn-gold">
              FALAR COM A EQUIPE
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Casting;
