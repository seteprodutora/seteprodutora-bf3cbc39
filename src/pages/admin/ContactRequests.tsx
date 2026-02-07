import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Eye,
  Loader2,
  Mail,
  Phone,
  Building2,
  Calendar,
  CheckCircle,
  Archive,
  MessageSquare,
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactRequest {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  event_type: string | null;
  event_date: string | null;
  message: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

const statusLabels: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  pending: { label: "Pendente", variant: "secondary" },
  contacted: { label: "Contatado", variant: "default" },
  archived: { label: "Arquivado", variant: "outline" },
};

const ContactRequests = () => {
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactRequest | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error: any) {
      console.error("Error fetching contacts:", error);
      toast({
        title: "Erro ao carregar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("contact_requests")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast({ title: "Status atualizado!" });
      fetchContacts();

      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const saveNotes = async () => {
    if (!selectedContact) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from("contact_requests")
        .update({ admin_notes: adminNotes })
        .eq("id", selectedContact.id);

      if (error) throw error;

      toast({ title: "Notas salvas!" });
      setSelectedContact({ ...selectedContact, admin_notes: adminNotes });
      fetchContacts();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const openDetails = (contact: ContactRequest) => {
    setSelectedContact(contact);
    setAdminNotes(contact.admin_notes || "");
    setShowDetails(true);
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filterStatus === "all") return true;
    return contact.status === filterStatus;
  });

  const pendingCount = contacts.filter((c) => c.status === "pending").length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-oswald">Solicitações de Contato</h1>
            <p className="text-muted-foreground">
              {pendingCount} pendente{pendingCount !== 1 ? "s" : ""} de resposta
            </p>
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 bg-secondary border-border">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
              <SelectItem value="contacted">Contatados</SelectItem>
              <SelectItem value="archived">Arquivados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredContacts.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {filterStatus === "all"
                ? "Nenhuma solicitação de contato recebida ainda."
                : "Nenhuma solicitação com este status."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-card rounded-xl border border-border p-4 flex flex-col sm:flex-row gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-oswald text-lg">{contact.name}</h3>
                      {contact.company && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {contact.company}
                        </p>
                      )}
                    </div>
                    <Badge variant={statusLabels[contact.status]?.variant || "secondary"}>
                      {statusLabels[contact.status]?.label || contact.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {contact.email}
                    </span>
                    {contact.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {contact.phone}
                      </span>
                    )}
                    {contact.event_date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(contact.event_date), "dd/MM/yyyy")}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {contact.message}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => openDetails(contact)}>
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Detalhes
                    </Button>

                    {contact.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(contact.id, "contacted")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Marcar como Contatado
                      </Button>
                    )}

                    {contact.status !== "archived" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateStatus(contact.id, "archived")}
                      >
                        <Archive className="w-4 h-4 mr-1" />
                        Arquivar
                      </Button>
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
              Detalhes do Contato
            </DialogTitle>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-oswald text-xl">{selectedContact.name}</h3>
                  {selectedContact.company && (
                    <p className="text-muted-foreground">{selectedContact.company}</p>
                  )}
                </div>
                <Badge
                  variant={statusLabels[selectedContact.status]?.variant || "secondary"}
                >
                  {statusLabels[selectedContact.status]?.label || selectedContact.status}
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="hover:text-primary"
                  >
                    {selectedContact.email}
                  </a>
                </div>
                {selectedContact.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="hover:text-primary"
                    >
                      {selectedContact.phone}
                    </a>
                  </div>
                )}
                {selectedContact.event_type && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedContact.event_type}</span>
                  </div>
                )}
                {selectedContact.event_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {format(new Date(selectedContact.event_date), "dd 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-2">Mensagem</h4>
                <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Notas do Admin</h4>
                <Textarea
                  placeholder="Adicione notas sobre este contato..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="min-h-24"
                />
                <Button
                  onClick={saveNotes}
                  disabled={saving}
                  className="mt-2"
                  size="sm"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : null}
                  Salvar Notas
                </Button>
              </div>

              <div className="flex gap-2">
                {selectedContact.status === "pending" && (
                  <Button
                    onClick={() => updateStatus(selectedContact.id, "contacted")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Marcar como Contatado
                  </Button>
                )}
                {selectedContact.status !== "archived" && (
                  <Button
                    variant="outline"
                    onClick={() => updateStatus(selectedContact.id, "archived")}
                  >
                    <Archive className="w-4 h-4 mr-1" />
                    Arquivar
                  </Button>
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                Recebido em{" "}
                {format(new Date(selectedContact.created_at), "dd/MM/yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ContactRequests;
