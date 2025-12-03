import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-background py-10 text-center border-t border-border">
      <div className="container mx-auto px-5">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="7 Produtora" className="h-10" />
        </div>
        <p className="text-muted-foreground/60 text-sm">
          © 2024 7 Produtora. Todos os direitos reservados.
        </p>
        <p className="text-muted-foreground/60 text-sm">
          Transformando artistas independentes em profissionais de sucesso.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
