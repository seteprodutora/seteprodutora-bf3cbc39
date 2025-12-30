import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Loader2, CheckCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "@/assets/logo.png";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const categories = [
  { value: "cantor", label: "Cantor(a)" },
  { value: "dj", label: "DJ" },
  { value: "musico", label: "Músico" },
  { value: "banda", label: "Banda" },
  { value: "influenciador", label: "Influenciador(a)" },
];

const genres = [
  "Sertanejo",
  "Funk",
  "Pop",
  "Rock",
  "MPB",
  "Eletrônica",
  "Pagode",
  "Forró",
  "Hip Hop",
  "Gospel",
  "Jazz",
  "Blues",
  "Axé",
  "Reggae",
  "Outro",
];

const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("Email inválido").max(255),
  phone: z.string().min(10, "Telefone inválido").max(20),
  bio: z.string().min(50, "Biografia deve ter pelo menos 50 caracteres").max(1000),
  category: z.string().min(1, "Selecione uma categoria"),
  city: z.string().min(2, "Cidade é obrigatória").max(100),
  state: z.string().min(2, "Estado é obrigatório"),
  experience_years: z.coerce.number().min(0).max(50).optional(),
  genres: z.array(z.string()).min(1, "Selecione pelo menos um gênero"),
  instagram: z.string().max(100).optional(),
  youtube: z.string().max(255).optional(),
  spotify: z.string().max(255).optional(),
});

type FormData = z.infer<typeof formSchema>;

const ArtistSubmission = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      category: "",
      city: "",
      state: "",
      experience_years: undefined,
      genres: [],
      instagram: "",
      youtube: "",
      spotify: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError(null);
    
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setImageError("Por favor, selecione uma imagem válida");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError("A imagem deve ter no máximo 5MB");
      return;
    }

    // Create preview and validate dimensions
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      // Check minimum dimensions
      if (img.width < 400 || img.height < 400) {
        setImageError("A imagem deve ter no mínimo 400x400 pixels");
        URL.revokeObjectURL(objectUrl);
        return;
      }

      // Check aspect ratio (should be roughly square, between 0.8 and 1.2)
      const aspectRatio = img.width / img.height;
      if (aspectRatio < 0.8 || aspectRatio > 1.2) {
        setImageError("A imagem deve ser quadrada (proporção 1:1)");
        URL.revokeObjectURL(objectUrl);
        return;
      }

      setProfileImage(file);
      setImagePreview(objectUrl);
    };

    img.onerror = () => {
      setImageError("Erro ao carregar a imagem");
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `submissions/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('artist-images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('artist-images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const onSubmit = async (data: FormData) => {
    if (!profileImage) {
      setImageError("Por favor, envie uma foto de perfil");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image
      const imageUrl = await uploadImage(profileImage);

      // Insert submission
      const { error } = await supabase.from('artist_submissions').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        bio: data.bio,
        profile_image: imageUrl,
        category: data.category,
        city: data.city,
        state: data.state,
        experience_years: data.experience_years || null,
        genres: data.genres,
        instagram: data.instagram || null,
        youtube: data.youtube || null,
        spotify: data.spotify || null,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Cadastro enviado!",
        description: "Sua solicitação foi recebida e será analisada em breve.",
      });
    } catch (error: any) {
      console.error("Error submitting:", error);
      toast({
        title: "Erro ao enviar",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-5">
        <div className="text-center max-w-md">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-oswald mb-4">Cadastro Enviado!</h1>
          <p className="text-muted-foreground mb-8">
            Sua solicitação foi recebida com sucesso. Nossa equipe irá analisar seu perfil 
            e entraremos em contato em breve.
          </p>
          <Link to="/" className="btn-gold">
            Voltar ao Início
          </Link>
        </div>
      </div>
    );
  }

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
              to="/seja-artista" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-5 max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-oswald mb-4">
              CADASTRE-SE NO <span className="text-gold">CASTING</span>
            </h1>
            <p className="text-muted-foreground">
              Preencha o formulário abaixo com suas informações. Após aprovação, 
              seu perfil será exibido em nossa vitrine para contratantes.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Photo Upload */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Foto de Perfil *</Label>
                <p className="text-sm text-muted-foreground">
                  Envie uma foto quadrada (1:1), mínimo 400x400px, máximo 5MB
                </p>
                <div className="flex items-start gap-6">
                  <div 
                    className={`w-32 h-32 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden ${
                      imageError ? 'border-destructive' : 'border-border'
                    }`}
                  >
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    {imageError && (
                      <p className="text-sm text-destructive">{imageError}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-oswald text-gold border-b border-border pb-2">
                  Informações Pessoais
                </h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Artístico *</FormLabel>
                      <FormControl>
                        <Input placeholder="Como você quer ser conhecido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp *</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade *</FormLabel>
                        <FormControl>
                          <Input placeholder="Sua cidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brazilianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Professional Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-oswald text-gold border-b border-border pb-2">
                  Informações Profissionais
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience_years"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anos de Experiência</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            max="50" 
                            placeholder="Ex: 5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="genres"
                  render={() => (
                    <FormItem>
                      <FormLabel>Gêneros Musicais *</FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                        {genres.map((genre) => (
                          <FormField
                            key={genre}
                            control={form.control}
                            name="genres"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(genre)}
                                    onCheckedChange={(checked) => {
                                      const updated = checked
                                        ? [...field.value, genre]
                                        : field.value?.filter((v) => v !== genre);
                                      field.onChange(updated);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal cursor-pointer">
                                  {genre}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biografia *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Conte um pouco sobre sua trajetória, conquistas e estilo musical..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        Mínimo 50 caracteres. {field.value.length}/1000
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-lg font-oswald text-gold border-b border-border pb-2">
                  Redes Sociais (opcional)
                </h3>

                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input placeholder="@seuusuario" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube</FormLabel>
                      <FormControl>
                        <Input placeholder="Link do seu canal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="spotify"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Spotify</FormLabel>
                      <FormControl>
                        <Input placeholder="Link do seu perfil" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full btn-gold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "ENVIAR CADASTRO"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Ao enviar, você concorda com nossos{" "}
                <Link to="/termos" className="text-primary hover:underline">
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link to="/privacidade" className="text-primary hover:underline">
                  Política de Privacidade
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ArtistSubmission;
