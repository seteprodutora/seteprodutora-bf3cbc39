
## Plano: Adicionar Lightbox nos Cards de Serviços

Vou implementar um lightbox (dialog) que abre ao clicar em cada card da seção "O Que Entregamos", exibindo uma descrição expandida focada em persuasão, autoridade e conexão.

---

### Estrutura da Solução

**1. Componente Dialog (Lightbox)**
Usar o componente `Dialog` do Radix UI que já está instalado no projeto para criar o lightbox.

**2. Estado para controlar qual serviço está aberto**
Adicionar um estado `useState` para armazenar o serviço selecionado.

**3. Conteúdo expandido para cada serviço**
Criar textos persuasivos e objetivos para cada um dos 7 pilares:

| Serviço | Foco do Texto |
|---------|---------------|
| Psicologia | Saúde mental como base do sucesso, blindagem emocional |
| Jurídico | Proteção e segurança para focar na arte |
| Produção | Qualidade profissional que compete no mercado |
| Branding | Imagem que gera conexão e reconhecimento |
| Marketing | Alcance estratégico e visibilidade real |
| Vendas | Monetização e negociações profissionais |
| Planejamento | Clareza de caminho e metas alcançáveis |

---

### Alterações no Arquivo

**`src/pages/About.tsx`**

1. **Importar componentes do Dialog:**
```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
```

2. **Expandir o array `services` com campo `fullDescription`:**
Cada serviço terá um texto mais longo (2-3 parágrafos) focado em:
- Conexão emocional com a dor do artista
- Autoridade da 7 Produtora na solução
- Rapport através de linguagem acessível

3. **Adicionar estado para serviço selecionado:**
```typescript
const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
```

4. **Tornar os cards clicáveis:**
Adicionar `onClick` e `cursor-pointer` nos cards.

5. **Renderizar o Dialog:**
Exibir o conteúdo completo quando um serviço estiver selecionado.

---

### Textos Persuasivos Planejados

**Psicologia:**
"A pressão do mercado, os bloqueios criativos e a ansiedade de palco podem destruir carreiras promissoras. Oferecemos acompanhamento psicológico especializado para artistas, ajudando você a manter a mente blindada enquanto conquista o sucesso. Artistas emocionalmente preparados performam melhor e duram mais no mercado."

**Jurídico:**
"Contratos mal feitos, direitos autorais não registrados e burocracias do ECAD são armadilhas que podem custar anos de trabalho. Nossa equipe jurídica cuida de toda a documentação, garantindo que você esteja 100% protegido para focar apenas na sua arte."

**Produção:**
"Seu talento merece uma produção à altura. Oferecemos gravação, mixagem e masterização com qualidade de mercado, transformando suas ideias em músicas que competem de igual para igual com grandes artistas."

**Branding:**
"No mercado atual, imagem é tão importante quanto talento. Construímos sua identidade visual, posicionamento e discurso de forma estratégica, criando uma marca que gera conexão instantânea com seu público."

**Marketing:**
"Ter música boa não basta se ninguém ouve. Criamos estratégias de tráfego pago, gestão de redes sociais e campanhas de alcance que colocam sua arte na frente das pessoas certas, no momento certo."

**Vendas:**
"Shows, eventos e parcerias são onde a música vira renda. Negociamos por você, garantindo as melhores condições e contratos justos. Enquanto você faz arte, nós fazemos dinheiro para você."

**Planejamento:**
"Sem direção, até o maior talento se perde. Criamos um mapa estratégico da sua carreira com metas claras, prazos definidos e etapas concretas. Você saberá exatamente onde está, para onde vai e como chegar lá."

---

### Resultado Visual

Ao clicar em qualquer card:
- Abre um modal centralizado com overlay escuro
- Exibe o ícone do serviço, título em destaque
- Texto expandido persuasivo (2-3 parágrafos)
- Botão para fechar (X) no canto superior direito

Os cards terão efeito hover melhorado para indicar que são clicáveis.
