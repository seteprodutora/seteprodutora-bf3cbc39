import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "7produtora_cookie_consent";

type ConsentStatus = "accepted" | "rejected" | null;

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card/95 backdrop-blur-lg border border-border rounded-xl p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0 hidden md:block">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <Cookie className="w-5 h-5 text-primary md:hidden" />
                Utilizamos Cookies
              </h3>
              <p className="text-muted-foreground text-sm">
                Este site utiliza cookies para melhorar sua experiência de navegação, 
                personalizar conteúdo e analisar o tráfego. Ao clicar em "Aceitar", 
                você concorda com o uso de cookies conforme nossa{" "}
                <Link 
                  to="/politica-de-privacidade" 
                  className="text-primary hover:text-primary/80 underline transition-colors"
                >
                  Política de Privacidade
                </Link>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={handleReject}
                className="w-full sm:w-auto border-border hover:bg-muted"
              >
                Rejeitar
              </Button>
              <Button
                onClick={handleAccept}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Aceitar Cookies
              </Button>
            </div>

            <button
              onClick={handleReject}
              className="absolute top-4 right-4 md:static text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fechar banner de cookies"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
