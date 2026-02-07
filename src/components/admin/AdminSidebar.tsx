import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Users, LogOut, Home, UserPlus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const AdminSidebar = () => {
  const { signOut } = useAuth();
  const location = useLocation();
  const [pendingSubmissions, setPendingSubmissions] = useState(0);
  const [pendingContacts, setPendingContacts] = useState(0);

  useEffect(() => {
    fetchCounts();

    // Subscribe to realtime updates
    const submissionsChannel = supabase
      .channel("admin-submissions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "artist_submissions" },
        () => fetchCounts()
      )
      .subscribe();

    const contactsChannel = supabase
      .channel("admin-contacts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_requests" },
        () => fetchCounts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(submissionsChannel);
      supabase.removeChannel(contactsChannel);
    };
  }, []);

  const fetchCounts = async () => {
    // Fetch pending submissions count
    const { count: submissionsCount } = await supabase
      .from("artist_submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    if (submissionsCount !== null) {
      setPendingSubmissions(submissionsCount);
    }

    // Fetch pending contacts count
    const { count: contactsCount } = await supabase
      .from("contact_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    if (contactsCount !== null) {
      setPendingContacts(contactsCount);
    }
  };

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, badge: 0 },
    { href: "/admin/artistas", label: "Artistas", icon: Users, badge: 0 },
    { href: "/admin/solicitacoes", label: "Solicitações", icon: UserPlus, badge: pendingSubmissions },
    { href: "/admin/contatos", label: "Contatos", icon: MessageSquare, badge: pendingContacts },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <img src={logo} alt="7 Produtora" className="h-12" />
        <p className="text-xs text-muted-foreground mt-2">Painel Administrativo</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="h-5 min-w-5 flex items-center justify-center text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <Home size={20} />
          <span>Ver Site</span>
        </Link>
        <Button
          variant="ghost"
          onClick={signOut}
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
