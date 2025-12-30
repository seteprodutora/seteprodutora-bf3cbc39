import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Users, Eye, EyeOff, Plus } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    visible: 0,
    hidden: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from("artists")
        .select("is_visible");

      if (!error && data) {
        setStats({
          total: data.length,
          visible: data.filter((a) => a.is_visible).length,
          hidden: data.filter((a) => !a.is_visible).length,
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Visão geral do casting da 7 Produtora
            </p>
          </div>
          <Link to="/admin/artistas/novo">
            <Button className="btn-gold">
              <Plus className="mr-2 h-4 w-4" />
              Novo Artista
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Artistas
              </CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Visíveis no Site
              </CardTitle>
              <Eye className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.visible}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ocultos
              </CardTitle>
              <EyeOff className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.hidden}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Link to="/admin/artistas">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Ver Todos os Artistas
              </Button>
            </Link>
            <Link to="/admin/artistas/novo">
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Artista
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
