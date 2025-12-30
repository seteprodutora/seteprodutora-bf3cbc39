import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  profile_image: string | null;
  is_visible: boolean;
  created_at: string;
}

const ArtistsList = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchArtists = async () => {
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar artistas",
        description: error.message,
      });
    } else {
      setArtists(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const toggleVisibility = async (artist: Artist) => {
    const { error } = await supabase
      .from("artists")
      .update({ is_visible: !artist.is_visible })
      .eq("id", artist.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message,
      });
    } else {
      fetchArtists();
      toast({
        title: artist.is_visible ? "Artista ocultado" : "Artista visível",
      });
    }
  };

  const deleteArtist = async (id: string) => {
    const { error } = await supabase.from("artists").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: error.message,
      });
    } else {
      fetchArtists();
      toast({ title: "Artista excluído com sucesso" });
    }
  };

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Artistas</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie o casting da 7 Produtora
            </p>
          </div>
          <Link to="/admin/artistas/novo">
            <Button className="btn-gold">
              <Plus className="mr-2 h-4 w-4" />
              Novo Artista
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar artista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Carregando...
          </div>
        ) : filteredArtists.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "Nenhum artista encontrado"
                  : "Nenhum artista cadastrado"}
              </p>
              {!searchTerm && (
                <Link to="/admin/artistas/novo">
                  <Button className="mt-4 btn-gold">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar primeiro artista
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <Card
                key={artist.id}
                className="bg-card border-border overflow-hidden"
              >
                <div className="aspect-square relative bg-secondary">
                  {artist.profile_image ? (
                    <img
                      src={artist.profile_image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Sem foto
                    </div>
                  )}
                  <Badge
                    className={`absolute top-3 right-3 ${
                      artist.is_visible
                        ? "bg-green-500/20 text-green-500"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {artist.is_visible ? "Visível" : "Oculto"}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-foreground">
                    {artist.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {artist.bio || "Sem biografia"}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleVisibility(artist)}
                      className="flex-1"
                    >
                      {artist.is_visible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Link to={`/admin/artistas/${artist.id}/editar`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-card border-border">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir artista?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. O artista e todas as
                            suas fotos serão removidos permanentemente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteArtist(artist.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ArtistsList;
