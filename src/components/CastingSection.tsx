import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  slug: string;
  profile_image: string | null;
}

const CastingSection = () => {
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

  if (isLoading) {
    return (
      <section id="casting" className="py-20 bg-background">
        <div className="container mx-auto px-5 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (artists.length === 0) {
    return null;
  }

  return (
    <section id="casting" className="py-20 bg-background">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            Nosso Casting
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conheça os talentos que fazem parte da 7 Produtora
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              to={`/artistas/${artist.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-card"
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
      </div>
    </section>
  );
};

export default CastingSection;
