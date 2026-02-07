import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ArtistPhoto {
  id?: string;
  image_url: string;
  caption: string;
  order_index: number;
}

const categories = [
  { value: "cantor", label: "Cantor(a)" },
  { value: "dj", label: "DJ" },
  { value: "musico", label: "Músico" },
  { value: "banda", label: "Banda" },
  { value: "influenciador", label: "Influenciador(a)" },
];

const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const commonGenres = [
  "Axé", "Blues", "Bossa Nova", "Country", "Eletrônica", "Forró",
  "Funk", "Gospel", "Hip Hop", "Jazz", "MPB", "Pagode", "Pop",
  "R&B", "Rap", "Reggae", "Rock", "Samba", "Sertanejo", "Soul"
];

const ArtistForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  // Basic info
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  
  // New fields
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [experienceYears, setExperienceYears] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [spotify, setSpotify] = useState("");
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState("");
  
  // Gallery
  const [photos, setPhotos] = useState<ArtistPhoto[]>([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  
  // Genre input
  const [newGenre, setNewGenre] = useState("");

  useEffect(() => {
    if (isEditing) {
      fetchArtist();
    }
  }, [id]);

  const fetchArtist = async () => {
    setIsLoading(true);
    const { data: artist, error } = await supabase
      .from("artists")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar artista",
        description: error.message,
      });
      navigate("/admin/artistas");
      return;
    }

    setName(artist.name);
    setBio(artist.bio || "");
    setProfileImage(artist.profile_image || "");
    setIsVisible(artist.is_visible);
    setCategory(artist.category || "");
    setCity(artist.city || "");
    setState(artist.state || "");
    setExperienceYears(artist.experience_years?.toString() || "");
    setGenres(artist.genres || []);
    setInstagram(artist.instagram || "");
    setYoutube(artist.youtube || "");
    setSpotify(artist.spotify || "");
    setYoutubeVideoUrl(artist.youtube_video_url || "");

    const { data: artistPhotos } = await supabase
      .from("artist_photos")
      .select("*")
      .eq("artist_id", id)
      .order("order_index");

    if (artistPhotos) {
      setPhotos(artistPhotos);
    }
    setIsLoading(false);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const uploadImage = async (
    file: File,
    folder: string
  ): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${crypto.randomUUID()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("artist-images")
      .upload(fileName, file);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro no upload",
        description: error.message,
      });
      return null;
    }

    const { data } = supabase.storage
      .from("artist-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingProfile(true);
    const url = await uploadImage(file, "profiles");
    if (url) {
      setProfileImage(url);
    }
    setUploadingProfile(false);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadingGallery(true);
    const newPhotos: ArtistPhoto[] = [];

    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage(files[i], "gallery");
      if (url) {
        newPhotos.push({
          image_url: url,
          caption: "",
          order_index: photos.length + i,
        });
      }
    }

    setPhotos([...photos, ...newPhotos]);
    setUploadingGallery(false);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const addGenre = (genre: string) => {
    const trimmedGenre = genre.trim();
    if (trimmedGenre && !genres.includes(trimmedGenre)) {
      setGenres([...genres, trimmedGenre]);
    }
    setNewGenre("");
  };

  const removeGenre = (genre: string) => {
    setGenres(genres.filter((g) => g !== genre));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Nome obrigatório",
        description: "Por favor, insira o nome do artista",
      });
      return;
    }

    setIsSaving(true);

    const slug = generateSlug(name);
    const artistData = {
      name,
      slug,
      bio: bio || null,
      profile_image: profileImage || null,
      is_visible: isVisible,
      category: category || null,
      city: city || null,
      state: state || null,
      experience_years: experienceYears ? parseInt(experienceYears) : null,
      genres: genres.length > 0 ? genres : null,
      instagram: instagram || null,
      youtube: youtube || null,
      spotify: spotify || null,
      youtube_video_url: youtubeVideoUrl || null,
    };

    try {
      let artistId = id;

      if (isEditing) {
        const { error } = await supabase
          .from("artists")
          .update(artistData)
          .eq("id", id);

        if (error) throw error;

        // Delete old photos and insert new ones
        await supabase.from("artist_photos").delete().eq("artist_id", id);
      } else {
        const { data, error } = await supabase
          .from("artists")
          .insert(artistData)
          .select("id")
          .single();

        if (error) throw error;
        artistId = data.id;
      }

      // Insert photos
      if (photos.length > 0 && artistId) {
        const photosToInsert = photos.map((photo, index) => ({
          artist_id: artistId,
          image_url: photo.image_url,
          caption: photo.caption || null,
          order_index: index,
        }));

        const { error: photosError } = await supabase
          .from("artist_photos")
          .insert(photosToInsert);

        if (photosError) throw photosError;
      }

      toast({
        title: isEditing ? "Artista atualizado!" : "Artista criado!",
      });
      navigate("/admin/artistas");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="mb-6">
          <Link
            to="/admin/artistas"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">
          {isEditing ? "Editar Artista" : "Novo Artista"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Artístico *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: João Silva"
                    className="bg-secondary border-border mt-2"
                  />
                </div>
                <div>
                  <Label>Categoria</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-secondary border-border mt-2">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Descreva a carreira e trabalhos do artista..."
                  className="bg-secondary border-border mt-2 min-h-32"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="visibility">Visível no site</Label>
                  <p className="text-sm text-muted-foreground">
                    Artistas ocultos não aparecem na seção de casting
                  </p>
                </div>
                <Switch
                  id="visibility"
                  checked={isVisible}
                  onCheckedChange={setIsVisible}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Experience */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Localização e Experiência</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: São Paulo"
                    className="bg-secondary border-border mt-2"
                  />
                </div>
                <div>
                  <Label>Estado</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="bg-secondary border-border mt-2">
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      {brazilianStates.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience">Anos de Experiência</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    placeholder="Ex: 5"
                    className="bg-secondary border-border mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Genres */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Gêneros Musicais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {commonGenres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() =>
                      genres.includes(genre) ? removeGenre(genre) : addGenre(genre)
                    }
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      genres.includes(genre)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-muted-foreground border-border hover:border-primary"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar gênero personalizado..."
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addGenre(newGenre);
                    }
                  }}
                  className="bg-secondary border-border"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addGenre(newGenre)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {genres.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-sm text-muted-foreground mr-2">Selecionados:</span>
                  {genres.map((genre) => (
                    <Badge
                      key={genre}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeGenre(genre)}
                    >
                      {genre}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@usuario"
                    className="bg-secondary border-border mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="spotify">Spotify</Label>
                  <Input
                    id="spotify"
                    value={spotify}
                    onChange={(e) => setSpotify(e.target.value)}
                    placeholder="https://open.spotify.com/artist/..."
                    className="bg-secondary border-border mt-2"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="youtube">Canal YouTube</Label>
                  <Input
                    id="youtube"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="https://youtube.com/@canal"
                    className="bg-secondary border-border mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="youtubeVideo">Vídeo em Destaque</Label>
                  <Input
                    id="youtubeVideo"
                    value={youtubeVideoUrl}
                    onChange={(e) => setYoutubeVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="bg-secondary border-border mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Image */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Foto de Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6">
                {profileImage ? (
                  <div className="relative w-40 h-40">
                    <img
                      src={profileImage}
                      alt="Perfil"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setProfileImage("")}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="w-40 h-40 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    {uploadingProfile ? (
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Upload</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileUpload}
                      className="hidden"
                      disabled={uploadingProfile}
                    />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Galeria de Fotos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={photo.image_url}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  {uploadingGallery ? (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Adicionar</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="hidden"
                    disabled={uploadingGallery}
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="submit" className="btn-gold" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : isEditing ? (
                "Salvar Alterações"
              ) : (
                "Criar Artista"
              )}
            </Button>
            <Link to="/admin/artistas">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ArtistForm;
