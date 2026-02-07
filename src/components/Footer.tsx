import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-5">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/">
              <img src={logo} alt="7 Produtora" className="h-12 mb-4" />
            </Link>
            <p className="text-muted-foreground text-sm">
              Transformando artistas independentes em profissionais de sucesso.
            </p>
          </div>

          {/* Links Institucionais */}
          <div>
            <h4 className="font-oswald text-sm mb-4">INSTITUCIONAL</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/sobre"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  to="/casting"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Nosso Casting
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Para Artistas */}
          <div>
            <h4 className="font-oswald text-sm mb-4">PARA ARTISTAS</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/seja-artista"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Seja um Artista
                </Link>
              </li>
              <li>
                <Link
                  to="/seja-artista/cadastro"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Cadastre-se
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-oswald text-sm mb-4">LEGAL</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/politica-de-privacidade"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/termos-de-uso"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground/60 text-sm">
            © {new Date().getFullYear()} 7 Produtora. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
