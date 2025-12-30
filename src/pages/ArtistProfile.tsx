import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, X } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  profile_image: string | null;
}

interface ArtistPhoto {
  id: string;
  image_url: string;
  caption: string | null;
}

const ArtistProfile = () => {
  const { slug } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [photos, setPhotos] = useState<ArtistPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      const { data: artistData, error } = await supabase
        .from("artists")
        .select("*")
        .eq("slug", slug)
        .eq("is_visible", true)
        .maybeSingle();

      if (error || !artistData) {
        setIsLoading(false);
        return;
      }

      setArtist(artistData);

      const { data: photosData } = await supabase
        .from("artist_photos")
        .select("*")
        .eq("artist_id", artistData.id)
        .order("order_index");

      if (photosData) {
        setPhotos(photosData);
      }
      setIsLoading(false);
    };

    fetchArtist();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-5 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Artista não encontrado
            </h1>
            <p className="text-muted-foreground mb-8">
              O artista que você procura não existe ou não está disponível.
            </p>
            <Link to="/#casting">
              <Button className="btn-gold">Ver Casting</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const whatsappMessage = `Olá! Gostaria de saber mais sobre o artista ${artist.name}.`;
  const whatsappUrl = `https://wa.me/5511964360431?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-5">
          {/* Back link */}
          <Link
            to="/#casting"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Casting
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Profile Image */}
            <div>
              {artist.profile_image ? (
                <img
                  src={artist.profile_image}
                  alt={artist.name}
                  className="w-full aspect-[3/4] object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-card rounded-2xl flex items-center justify-center">
                  <span className="text-8xl font-bold text-muted-foreground">
                    {artist.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gold mb-6">
                {artist.name}
              </h1>

              {artist.bio && (
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-foreground/80 text-lg leading-relaxed whitespace-pre-wrap">
                    {artist.bio}
                  </p>
                </div>
              )}

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button className="btn-gold">
                  Entrar em Contato
                </Button>
              </a>
            </div>
          </div>

          {/* Gallery */}
          {photos.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Galeria</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => setLightboxImage(photo.image_url)}
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer group"
                  >
                    <img
                      src={photo.image_url}
                      alt={photo.caption || artist.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-foreground hover:text-primary transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Ampliação"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ArtistProfile;
