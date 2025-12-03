import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#pilares", label: "Os 7 Pilares" },
  { href: "#contato", label: "Contato" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full py-4 bg-background/95 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-5">
        <nav className="flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img src={logo} alt="7 Produtora" className="h-14 md:h-16" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-medium text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label.toUpperCase()}
              </a>
            ))}
            <a
              href="#contato"
              className="btn-gold text-sm py-3 px-6"
            >
              AGENDAR REUNIÃO
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label.toUpperCase()}
                </a>
              ))}
              <a
                href="#contato"
                className="btn-gold text-center py-3 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                AGENDAR REUNIÃO
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
