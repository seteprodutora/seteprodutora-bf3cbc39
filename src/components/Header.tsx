import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 w-full py-4 bg-background/95 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-5">
        <nav className="flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img src={logo} alt="7 Produtora" className="h-10 md:h-12" />
          </a>
          <a 
            href="#contato" 
            className="font-semibold text-sm text-foreground hover:text-primary transition-colors"
          >
            ENTRAR EM CONTATO
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
