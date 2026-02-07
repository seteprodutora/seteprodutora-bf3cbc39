import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Loader2, 
  Mail, 
  Phone, 
  MapPin,
  Instagram,
  Youtube,
  Music,
  Clock,
  User
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  profile_image: string;
  category: string;
  instagram: string | null;
  youtube: string | null;
  spotify: string | null;
  city: string;
  state: string;
  experience_years: number | null;
  genres: string[] | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
  reviewed_at: string | null;
}

const categoryLabels: Record<string, string> = {
  cantor: "Cantor(a)",
  dj: "DJ",
  musico: "Músico",
  banda: "Banda",
  influenciador: "Influenciador(a)",
};

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pendente", variant: "secondary" },
  approved: { label: "Aprovado", variant: "default" },
  rejected: { label: "Rejeitado", variant: "destructive" },
};

const ArtistSubmissions = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('artist_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      console.error("Error fetching submissions:", error);
      toast({
        title: "Erro ao carregar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleApprove = async () => {
    if (!selectedSubmission) return;
    setProcessing(true);

    try {
      const slug = generateSlug(selectedSubmission.name);

      // Create artist from submission with all fields
      const { data: artist, error: artistError } = await supabase
        .from('artists')
        .insert({
          name: selectedSubmission.name,
          slug,
          bio: selectedSubmission.bio,
          profile_image: selectedSubmission.profile_image,
          is_visible: true,
          category: selectedSubmission.category,
          city: selectedSubmission.city,
          state: selectedSubmission.state,
          experience_years: selectedSubmission.experience_years,
          genres: selectedSubmission.genres,
          instagram: selectedSubmission.instagram,
          youtube: selectedSubmission.youtube,
          spotify: selectedSubmission.spotify,
        })
        .select()
        .single();

      if (artistError) throw artistError;

      // Update submission status
      const { error: updateError } = await supabase
        .from('artist_submissions')
        .update({
          status: 'approved',
          admin_notes: adminNotes || null,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', selectedSubmission.id);

      if (updateError) throw updateError;

      toast({
        title: "Artista aprovado!",
        description: `${selectedSubmission.name} foi adicionado ao casting.`,
      });

      setShowApproveDialog(false);
      setSelectedSubmission(null);
      setAdminNotes("");
      fetchSubmissions();
    } catch (error: any) {
      console.error("Error approving:", error);
      toast({
        title: "Erro ao aprovar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedSubmission) return;
    setProcessing(true);

    try {
      const { error } = await supabase
        .from('artist_submissions')
        .update({
          status: 'rejected',
          admin_notes: adminNotes || null,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      toast({
        title: "Solicitação rejeitada",
        description: "O artista foi notificado.",
      });

      setShowRejectDialog(false);
      setSelectedSubmission(null);
      setAdminNotes("");
      fetchSubmissions();
    } catch (error: any) {
      console.error("Error rejecting:", error);
      toast({
        title: "Erro ao rejeitar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const openApproveDialog = (submission: Submission) => {
    setSelectedSubmission(submission);
    setAdminNotes("");
    setShowApproveDialog(true);
  };

  const openRejectDialog = (submission: Submission) => {
    setSelectedSubmission(submission);
    setAdminNotes("");
    setShowRejectDialog(true);
  };

  const openDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  const pendingCount = submissions.filter(s => s.status === 'pending').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-oswald">Solicitações de Cadastro</h1>
            <p className="text-muted-foreground">
              {pendingCount} pendente{pendingCount !== 1 ? 's' : ''} de aprovação
            </p>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhuma solicitação recebida ainda.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-card rounded-xl border border-border p-4 flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={submission.profile_image}
                  alt={submission.name}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-oswald text-lg">{submission.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {categoryLabels[submission.category] || submission.category}
                      </p>
                    </div>
                    <Badge variant={statusLabels[submission.status]?.variant || "secondary"}>
                      {statusLabels[submission.status]?.label || submission.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {submission.city}, {submission.state}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(submission.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDetails(submission)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Detalhes
                    </Button>
                    
                    {submission.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => openApproveDialog(submission)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => openRejectDialog(submission)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Rejeitar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-oswald text-xl">
              Detalhes da Solicitação
            </DialogTitle>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <img
                  src={selectedSubmission.profile_image}
                  alt={selectedSubmission.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-oswald text-xl">{selectedSubmission.name}</h3>
                  <p className="text-muted-foreground">
                    {categoryLabels[selectedSubmission.category] || selectedSubmission.category}
                  </p>
                  <Badge 
                    variant={statusLabels[selectedSubmission.status]?.variant || "secondary"}
                    className="mt-2"
                  >
                    {statusLabels[selectedSubmission.status]?.label || selectedSubmission.status}
                  </Badge>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${selectedSubmission.email}`} className="hover:text-primary">
                    {selectedSubmission.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${selectedSubmission.phone}`} className="hover:text-primary">
                    {selectedSubmission.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  {selectedSubmission.city}, {selectedSubmission.state}
                </div>
                {selectedSubmission.experience_years && (
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-muted-foreground" />
                    {selectedSubmission.experience_years} anos de experiência
                  </div>
                )}
              </div>

              {selectedSubmission.genres && selectedSubmission.genres.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Gêneros Musicais</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedSubmission.genres.map((genre) => (
                      <Badge key={genre} variant="outline">{genre}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Biografia</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {selectedSubmission.bio}
                </p>
              </div>

              {(selectedSubmission.instagram || selectedSubmission.youtube || selectedSubmission.spotify) && (
                <div>
                  <h4 className="font-medium mb-2">Redes Sociais</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedSubmission.instagram && (
                      <a 
                        href={`https://instagram.com/${selectedSubmission.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm hover:text-primary"
                      >
                        <Instagram className="w-4 h-4" />
                        {selectedSubmission.instagram}
                      </a>
                    )}
                    {selectedSubmission.youtube && (
                      <a 
                        href={selectedSubmission.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm hover:text-primary"
                      >
                        <Youtube className="w-4 h-4" />
                        YouTube
                      </a>
                    )}
                    {selectedSubmission.spotify && (
                      <a 
                        href={selectedSubmission.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm hover:text-primary"
                      >
                        <Music className="w-4 h-4" />
                        Spotify
                      </a>
                    )}
                  </div>
                </div>
              )}

              {selectedSubmission.admin_notes && (
                <div>
                  <h4 className="font-medium mb-2">Notas do Admin</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    {selectedSubmission.admin_notes}
                  </p>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Enviado em {new Date(selectedSubmission.created_at).toLocaleString('pt-BR')}
                {selectedSubmission.reviewed_at && (
                  <> · Revisado em {new Date(selectedSubmission.reviewed_at).toLocaleString('pt-BR')}</>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Aprovar Artista</AlertDialogTitle>
            <AlertDialogDescription>
              Ao aprovar, {selectedSubmission?.name} será adicionado automaticamente ao casting 
              e ficará visível para contratantes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium">Notas (opcional)</label>
            <Textarea
              placeholder="Adicione observações internas..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="mt-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleApprove}
              disabled={processing}
              className="bg-green-600 hover:bg-green-700"
            >
              {processing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Aprovar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rejeitar Solicitação</AlertDialogTitle>
            <AlertDialogDescription>
              A solicitação de {selectedSubmission?.name} será rejeitada. Esta ação pode ser revertida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium">Motivo (opcional)</label>
            <Textarea
              placeholder="Explique o motivo da rejeição..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="mt-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              disabled={processing}
              className="bg-destructive hover:bg-destructive/90"
            >
              {processing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Rejeitar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default ArtistSubmissions;
