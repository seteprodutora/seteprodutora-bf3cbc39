import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-5 py-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>

        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Termos de Uso
            </h1>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </header>

          <div className="space-y-10 text-muted-foreground">
            {/* 1. Introdução */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                1. Introdução e Aceitação dos Termos
              </h2>
              <p className="mb-4">
                Bem-vindo ao site da <strong className="text-foreground">7 Produtora</strong>. Ao acessar e utilizar este site e nossos serviços, você concorda integralmente com estes Termos de Uso.
              </p>
              <p className="mb-4">
                Se você não concordar com qualquer parte destes termos, solicitamos que não utilize nosso site ou serviços.
              </p>
              <p>
                Estes Termos de Uso constituem um contrato vinculante entre você ("Usuário", "Cliente" ou "Artista") e a 7 Produtora ("nós", "nosso" ou "Empresa"), regulando o uso do site e a prestação de nossos serviços de gestão de carreira artística.
              </p>
            </section>

            {/* 2. Sobre a 7 Produtora */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. Sobre a 7 Produtora
              </h2>
              <p className="mb-4">
                A 7 Produtora é uma empresa especializada em gestão 360º de carreiras de artistas independentes. Nossos serviços abrangem os 7 Pilares fundamentais para o sucesso artístico:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-foreground">Mentalidade:</strong> Acompanhamento psicológico e preparação emocional</li>
                <li><strong className="text-foreground">Planejamento:</strong> Estratégia e roadmap de carreira</li>
                <li><strong className="text-foreground">Criação:</strong> Direção artística e desenvolvimento criativo</li>
                <li><strong className="text-foreground">Produção:</strong> Gravação, mixagem e masterização</li>
                <li><strong className="text-foreground">Gestão:</strong> Contratos, direitos autorais e finanças</li>
                <li><strong className="text-foreground">Branding:</strong> Identidade visual e posicionamento</li>
                <li><strong className="text-foreground">Expansão:</strong> Marketing, mídia social e negociação de shows</li>
              </ul>
            </section>

            {/* 3. Uso do Site */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Uso do Site
              </h2>
              <p className="mb-4">Ao utilizar nosso site, você concorda em:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fornecer informações verdadeiras, precisas e atualizadas</li>
                <li>Não utilizar o site para fins ilegais ou não autorizados</li>
                <li>Não tentar acessar áreas restritas ou sistemas internos</li>
                <li>Não interferir no funcionamento adequado do site</li>
                <li>Não transmitir vírus, malware ou código malicioso</li>
                <li>Respeitar os direitos de propriedade intelectual</li>
              </ul>
            </section>

            {/* 4. Serviços */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Prestação de Serviços
              </h2>
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.1 Diagnóstico de Carreira</h3>
              <p className="mb-4">
                Oferecemos uma consulta inicial gratuita ("Diagnóstico de Carreira") para avaliar sua situação atual e identificar oportunidades de desenvolvimento. Esta consulta não constitui obrigação de contratação de serviços.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.2 Contratação de Serviços</h3>
              <p className="mb-4">
                A contratação de serviços será formalizada através de contrato específico, que detalhará:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Escopo dos serviços a serem prestados</li>
                <li>Prazo de duração do contrato</li>
                <li>Valores e condições de pagamento</li>
                <li>Direitos e obrigações de ambas as partes</li>
                <li>Condições de rescisão</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.3 Obrigações do Cliente</h3>
              <p className="mb-4">O cliente compromete-se a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Colaborar ativamente com as estratégias propostas</li>
                <li>Fornecer materiais e informações solicitadas nos prazos acordados</li>
                <li>Comparecer às reuniões e sessões agendadas</li>
                <li>Efetuar os pagamentos nas datas acordadas</li>
                <li>Comunicar prontamente qualquer alteração relevante</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.4 Obrigações da 7 Produtora</h3>
              <p className="mb-4">A 7 Produtora compromete-se a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Prestar os serviços com profissionalismo e dedicação</li>
                <li>Manter sigilo sobre informações confidenciais do cliente</li>
                <li>Fornecer relatórios e atualizações sobre o andamento dos trabalhos</li>
                <li>Atuar sempre no melhor interesse da carreira do artista</li>
                <li>Cumprir os prazos e entregas acordados</li>
              </ul>
            </section>

            {/* 5. Propriedade Intelectual */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Propriedade Intelectual
              </h2>
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">5.1 Conteúdo do Site</h3>
              <p className="mb-4">
                Todo o conteúdo deste site, incluindo textos, imagens, logotipos, design, código e demais elementos, é de propriedade exclusiva da 7 Produtora ou de seus licenciadores, protegido pelas leis de direitos autorais e propriedade intelectual.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">5.2 Obras do Artista</h3>
              <p className="mb-4">
                As obras musicais, performances e criações do artista permanecem de sua propriedade exclusiva. A 7 Produtora atua como gestora e representante, sem adquirir direitos autorais sobre as criações do artista, salvo acordo específico em contrário.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">5.3 Materiais Desenvolvidos</h3>
              <p>
                Os termos de propriedade sobre materiais desenvolvidos conjuntamente (como identidade visual, materiais de marketing, etc.) serão definidos no contrato de prestação de serviços.
              </p>
            </section>

            {/* 6. Pagamentos */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Pagamentos e Política Financeira
              </h2>
              <p className="mb-4">
                Os valores, formas de pagamento e condições financeiras serão estabelecidos no contrato de prestação de serviços específico. Algumas diretrizes gerais:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Os pagamentos devem ser realizados nas datas acordadas</li>
                <li>Atrasos podem resultar em suspensão dos serviços</li>
                <li>Valores podem ser reajustados mediante aviso prévio de 30 dias</li>
                <li>Reembolsos seguirão as condições previstas no contrato</li>
              </ul>
            </section>

            {/* 7. Confidencialidade */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Confidencialidade
              </h2>
              <p className="mb-4">
                Ambas as partes comprometem-se a manter sigilo sobre informações confidenciais compartilhadas durante a relação comercial, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Estratégias de carreira e planos de lançamento</li>
                <li>Informações financeiras e contratuais</li>
                <li>Dados pessoais e profissionais</li>
                <li>Obras não lançadas e projetos em desenvolvimento</li>
                <li>Know-how e metodologias proprietárias</li>
              </ul>
              <p className="mt-4">
                Esta obrigação de confidencialidade permanece vigente mesmo após o término da relação contratual.
              </p>
            </section>

            {/* 8. Limitação de Responsabilidade */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Limitação de Responsabilidade
              </h2>
              <p className="mb-4">A 7 Produtora não se responsabiliza por:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Resultados artísticos ou comerciais não alcançados, uma vez que o sucesso depende de múltiplos fatores, incluindo o esforço e dedicação do artista</li>
                <li>Decisões tomadas por terceiros (gravadoras, plataformas, contratantes)</li>
                <li>Interrupções ou falhas no site causadas por fatores externos</li>
                <li>Conteúdo de sites de terceiros acessados através de links</li>
                <li>Danos indiretos, incidentais ou consequenciais</li>
              </ul>
              <p className="mt-4">
                <strong className="text-foreground">Importante:</strong> Nossos serviços são de meio, não de resultado. Trabalhamos com estratégias comprovadas, mas não garantimos resultados específicos de vendas, streams ou reconhecimento.
              </p>
            </section>

            {/* 9. Rescisão */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Rescisão
              </h2>
              <p className="mb-4">
                As condições específicas de rescisão serão definidas no contrato de prestação de serviços. De modo geral:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Qualquer parte pode solicitar rescisão mediante aviso prévio</li>
                <li>Rescisão por justa causa pode ocorrer em casos de descumprimento grave</li>
                <li>Valores devidos até a data da rescisão permanecem exigíveis</li>
                <li>Materiais e trabalhos em andamento serão tratados conforme o contrato</li>
              </ul>
            </section>

            {/* 10. Comunicação */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                10. Comunicação
              </h2>
              <p className="mb-4">
                As comunicações oficiais entre as partes poderão ser realizadas através de:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>E-mail cadastrado</li>
                <li>WhatsApp oficial da 7 Produtora</li>
                <li>Reuniões presenciais ou virtuais agendadas</li>
              </ul>
              <p className="mt-4">
                Notificações importantes serão enviadas por escrito (e-mail) e consideradas recebidas em até 48 horas após o envio.
              </p>
            </section>

            {/* 11. Alterações nos Termos */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                11. Alterações nos Termos
              </h2>
              <p className="mb-4">
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Alterações significativas serão comunicadas através de:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Aviso destacado no site</li>
                <li>E-mail para clientes cadastrados</li>
                <li>Atualização da data de "última atualização"</li>
              </ul>
              <p className="mt-4">
                O uso continuado do site após as alterações constitui aceitação dos novos termos.
              </p>
            </section>

            {/* 12. Disposições Gerais */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                12. Disposições Gerais
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-foreground">Lei Aplicável:</strong> Estes termos são regidos pelas leis da República Federativa do Brasil</li>
                <li><strong className="text-foreground">Foro:</strong> Fica eleito o foro da comarca de [Cidade/Estado] para dirimir quaisquer controvérsias</li>
                <li><strong className="text-foreground">Independência das Cláusulas:</strong> A invalidade de qualquer cláusula não afeta as demais</li>
                <li><strong className="text-foreground">Acordo Integral:</strong> Estes termos, juntamente com a Política de Privacidade e contratos específicos, constituem o acordo integral entre as partes</li>
              </ul>
            </section>

            {/* 13. Contato */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                13. Contato
              </h2>
              <p className="mb-4">
                Para dúvidas, sugestões ou esclarecimentos sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <p className="mb-2"><strong className="text-foreground">7 Produtora</strong></p>
                <p className="mb-2"><strong className="text-foreground">E-mail:</strong> contato@7produtora.com.br</p>
                <p><strong className="text-foreground">WhatsApp:</strong> Disponível no botão de contato do site</p>
              </div>
            </section>

            {/* Link para Política de Privacidade */}
            <section className="pt-6 border-t border-border">
              <p className="text-center">
                Consulte também nossa{" "}
                <Link to="/politica-de-privacidade" className="text-primary hover:text-primary/80 transition-colors">
                  Política de Privacidade
                </Link>
                {" "}para informações sobre como tratamos seus dados pessoais.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
