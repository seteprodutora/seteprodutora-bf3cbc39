const pillars = [{
  number: '01',
  title: 'Mentalidade',
  description: 'Acompanhamento psicológico especializado para lidar com a pressão, bloqueios criativos e ansiedade de palco.'
}, {
  number: '02',
  title: 'Planejamento',
  description: 'Mapa de carreira estratégico. Definimos onde você está, onde quer chegar e qual o caminho exato.'
}, {
  number: '03',
  title: 'Criação',
  description: 'Suporte na composição autoral, direção artística e refinamento do seu som único e identidade.'
}, {
  number: '04',
  title: 'Produção',
  description: 'Gravação, mixagem e masterização com qualidade de mercado. Transformamos demos em hits.'
}, {
  number: '05',
  title: 'Gestão',
  description: 'Burocracia zero para você. Contratos, registros de obras, ecad, direitos autorais e gestão financeira.'
}, {
  number: '06',
  title: 'Branding',
  description: 'Construção de marca forte. Identidade visual, posicionamento, fotos e discurso que conectam.'
}, {
  number: '07',
  title: 'Expansão',
  description: 'Marketing & Vendas. Tráfego pago, redes sociais e negociação de shows para monetizar sua arte.',
  highlight: true
}];
const PillarsSection = () => {
  return <section className="py-20 md:py-24 bg-secondary" id="pilares">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-oswald">
            OS 7 <span className="text-gold">PILARES</span>
          </h2>
          <p className="text-muted-foreground mt-3">Nossa metodologia própria para transformar talento em legado.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pillars.map(pillar => <div key={pillar.number} className={`card-pillar ${pillar.highlight ? 'border-gold' : ''}`} style={pillar.highlight ? {
          borderColor: 'hsl(var(--primary))'
        } : {}}>
              <div className="absolute top-0 right-5 text-6xl font-black text-foreground/5 transition-colors group-hover:text-gold/20">
                {pillar.number}
              </div>
              <h3 className="text-xl font-oswald text-gold mb-4 relative z-10">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground relative z-10">
                {pillar.highlight && <strong className="text-foreground">Marketing & Vendas. </strong>}
                {pillar.highlight ? pillar.description.replace('Marketing & Vendas. ', '') : pillar.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default PillarsSection;