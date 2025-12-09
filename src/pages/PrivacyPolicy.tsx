import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </header>

          <div className="space-y-10 text-muted-foreground">
            {/* 1. Introdução */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                1. Introdução e Identificação do Controlador
              </h2>
              <p className="mb-4">
                A <strong className="text-foreground">7 Produtora</strong> ("nós", "nosso" ou "Controlador"), empresa dedicada à gestão de carreiras de artistas independentes, está comprometida com a proteção da privacidade e dos dados pessoais de seus usuários, clientes e visitantes.
              </p>
              <p>
                Esta Política de Privacidade foi elaborada em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD) e tem como objetivo informar de forma clara e transparente como coletamos, usamos, armazenamos e protegemos seus dados pessoais.
              </p>
            </section>

            {/* 2. Dados Coletados */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. Dados Pessoais Coletados
              </h2>
              <p className="mb-4">Podemos coletar os seguintes tipos de dados pessoais:</p>
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.1 Dados de Identificação</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de telefone/WhatsApp</li>
                <li>Nome artístico</li>
                <li>Informações profissionais relacionadas à carreira artística</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.2 Dados de Navegação</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Endereço IP</li>
                <li>Tipo de navegador e dispositivo</li>
                <li>Páginas visitadas e tempo de permanência</li>
                <li>Data e horário de acesso</li>
                <li>Origem do tráfego (de onde você veio)</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.3 Dados Fornecidos Voluntariamente</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Informações enviadas através de formulários de contato</li>
                <li>Mensagens via WhatsApp</li>
                <li>Conteúdo de comunicações conosco</li>
              </ul>
            </section>

            {/* 3. Finalidade */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Finalidade do Tratamento de Dados
              </h2>
              <p className="mb-4">Utilizamos seus dados pessoais para as seguintes finalidades:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-foreground">Contato e Comunicação:</strong> Responder suas solicitações, agendar reuniões e fornecer informações sobre nossos serviços</li>
                <li><strong className="text-foreground">Prestação de Serviços:</strong> Executar os serviços contratados de gestão de carreira artística</li>
                <li><strong className="text-foreground">Marketing:</strong> Enviar comunicações sobre novidades, conteúdos e ofertas (mediante seu consentimento)</li>
                <li><strong className="text-foreground">Melhoria da Experiência:</strong> Analisar o uso do site para aprimorar nossos serviços e conteúdos</li>
                <li><strong className="text-foreground">Obrigações Legais:</strong> Cumprir obrigações legais, regulatórias e contratuais</li>
              </ul>
            </section>

            {/* 4. Base Legal */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Base Legal para Tratamento (Art. 7º LGPD)
              </h2>
              <p className="mb-4">O tratamento de seus dados pessoais é fundamentado nas seguintes bases legais:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-foreground">Consentimento (Art. 7º, I):</strong> Para envio de comunicações de marketing e newsletters</li>
                <li><strong className="text-foreground">Execução de Contrato (Art. 7º, V):</strong> Para prestação dos serviços contratados</li>
                <li><strong className="text-foreground">Legítimo Interesse (Art. 7º, IX):</strong> Para melhorar nossos serviços e garantir a segurança do site</li>
                <li><strong className="text-foreground">Cumprimento de Obrigação Legal (Art. 7º, II):</strong> Para atender exigências legais e regulatórias</li>
              </ul>
            </section>

            {/* 5. Compartilhamento */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Compartilhamento de Dados
              </h2>
              <p className="mb-4">Seus dados pessoais podem ser compartilhados com:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-foreground">Parceiros de Negócio:</strong> Gravadoras, distribuidoras e plataformas de streaming (apenas com seu consentimento e para execução dos serviços)</li>
                <li><strong className="text-foreground">Prestadores de Serviço:</strong> Empresas que nos auxiliam na operação (hospedagem, analytics, e-mail marketing)</li>
                <li><strong className="text-foreground">Autoridades:</strong> Quando exigido por lei ou ordem judicial</li>
              </ul>
              <p className="mt-4">
                <strong className="text-foreground">Importante:</strong> Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros para fins de marketing.
              </p>
            </section>

            {/* 6. Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Cookies e Tecnologias Similares
              </h2>
              <p className="mb-4">Utilizamos cookies e tecnologias similares para:</p>
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">6.1 Tipos de Cookies</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-foreground">Cookies Essenciais:</strong> Necessários para o funcionamento básico do site</li>
                <li><strong className="text-foreground">Cookies de Desempenho:</strong> Coletam informações sobre como você usa o site</li>
                <li><strong className="text-foreground">Cookies de Marketing:</strong> Utilizados para exibir anúncios relevantes</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">6.2 Gerenciamento de Cookies</h3>
              <p>
                Você pode gerenciar suas preferências de cookies através das configurações do seu navegador. Note que desabilitar certos cookies pode afetar a funcionalidade do site.
              </p>
            </section>

            {/* 7. Direitos do Titular */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Seus Direitos (Art. 18 LGPD)
              </h2>
              <p className="mb-4">Como titular dos dados, você tem os seguintes direitos:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-foreground">Confirmação e Acesso:</strong> Saber se tratamos seus dados e obter uma cópia deles</li>
                <li><strong className="text-foreground">Correção:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados</li>
                <li><strong className="text-foreground">Anonimização, Bloqueio ou Eliminação:</strong> Solicitar que dados desnecessários ou tratados em desconformidade sejam anonimizados, bloqueados ou eliminados</li>
                <li><strong className="text-foreground">Portabilidade:</strong> Solicitar a transferência dos seus dados para outro fornecedor</li>
                <li><strong className="text-foreground">Eliminação:</strong> Solicitar a exclusão dos dados tratados com base no seu consentimento</li>
                <li><strong className="text-foreground">Informação sobre Compartilhamento:</strong> Saber com quais entidades públicas e privadas compartilhamos seus dados</li>
                <li><strong className="text-foreground">Revogação do Consentimento:</strong> Retirar seu consentimento a qualquer momento</li>
                <li><strong className="text-foreground">Oposição:</strong> Opor-se ao tratamento quando realizado sem seu consentimento</li>
              </ul>
              <p className="mt-4">
                Para exercer qualquer um desses direitos, entre em contato com nosso Encarregado de Proteção de Dados através do e-mail informado na seção 10.
              </p>
            </section>

            {/* 8. Segurança */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Segurança dos Dados
              </h2>
              <p className="mb-4">
                Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Criptografia de dados em trânsito (HTTPS/SSL)</li>
                <li>Controle de acesso restrito aos dados</li>
                <li>Monitoramento e auditorias regulares de segurança</li>
                <li>Treinamento de equipe sobre proteção de dados</li>
                <li>Procedimentos de resposta a incidentes de segurança</li>
              </ul>
            </section>

            {/* 9. Retenção */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Retenção de Dados
              </h2>
              <p className="mb-4">
                Seus dados pessoais serão mantidos apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Durante a vigência da relação contratual</li>
                <li>Pelo período exigido por obrigações legais e regulatórias</li>
                <li>Para o exercício regular de direitos em processos judiciais, administrativos ou arbitrais</li>
              </ul>
              <p className="mt-4">
                Após o término do período de retenção, os dados serão eliminados ou anonimizados de forma segura.
              </p>
            </section>

            {/* 10. DPO */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                10. Contato do Encarregado (DPO)
              </h2>
              <p className="mb-4">
                Para questões relacionadas a esta Política de Privacidade ou para exercer seus direitos como titular de dados, entre em contato com nosso Encarregado de Proteção de Dados (DPO):
              </p>
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <p className="mb-2"><strong className="text-foreground">Encarregado de Proteção de Dados:</strong> 7 Produtora</p>
                <p className="mb-2"><strong className="text-foreground">E-mail:</strong> privacidade@7produtora.com.br</p>
                <p><strong className="text-foreground">Prazo de Resposta:</strong> Responderemos sua solicitação em até 15 (quinze) dias úteis, conforme previsto na LGPD.</p>
              </div>
            </section>

            {/* 11. Alterações */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                11. Alterações nesta Política
              </h2>
              <p className="mb-4">
                Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou em requisitos legais. Quando fizermos alterações significativas:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Atualizaremos a data de "última atualização" no topo desta página</li>
                <li>Notificaremos você por e-mail ou através de aviso destacado em nosso site</li>
                <li>Quando necessário, solicitaremos seu consentimento novamente</li>
              </ul>
              <p className="mt-4">
                Recomendamos que você revise esta política periodicamente para estar ciente de como protegemos suas informações.
              </p>
            </section>

            {/* 12. Disposições Finais */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                12. Disposições Finais
              </h2>
              <p className="mb-4">
                Esta Política de Privacidade é regida pelas leis da República Federativa do Brasil. Quaisquer disputas serão submetidas ao foro da comarca de [Cidade/Estado], com exclusão de qualquer outro, por mais privilegiado que seja.
              </p>
              <p>
                Ao utilizar nosso site e serviços, você declara ter lido, compreendido e concordado com os termos desta Política de Privacidade.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
