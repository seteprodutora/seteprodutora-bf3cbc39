import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SejaArtista from "./pages/SejaArtista";
import Casting from "./pages/Casting";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import ArtistsList from "./pages/admin/ArtistsList";
import ArtistForm from "./pages/admin/ArtistForm";
import ArtistProfile from "./pages/ArtistProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/seja-artista" element={<SejaArtista />} />
            <Route path="/casting" element={<Casting />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos-de-uso" element={<TermsOfUse />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/artistas" element={<ArtistsList />} />
            <Route path="/admin/artistas/novo" element={<ArtistForm />} />
            <Route path="/admin/artistas/:id/editar" element={<ArtistForm />} />
            <Route path="/artistas/:slug" element={<ArtistProfile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
