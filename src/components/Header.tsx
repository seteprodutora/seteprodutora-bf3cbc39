const Header = () => {
  return (
    <header className="fixed top-0 w-full py-5 bg-background/95 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-5">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-black text-foreground font-oswald">
            7 <span className="text-gold">PRODUTORA</span>
          </div>
          <a 
            href="#contato" 
            className="font-semibold text-sm text-foreground hover:text-gold transition-colors"
          >
            ENTRAR EM CONTATO
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
