
## Plano: Melhorias para Completar a Plataforma 7 Produtora

Análise completa do que falta para transmitir credibilidade e profissionalismo para artistas e contratantes.

---

### Prioridade 1: Perfil do Artista Completo (Credibilidade Imediata)

**Problema atual:** A página do artista (`/artistas/:slug`) mostra apenas nome, foto, bio e galeria. Contratantes precisam de muito mais informações para tomar decisões.

**Solução - Adicionar campos visíveis:**
- Categoria (Cantor, DJ, Músico, Banda, Influenciador)
- Gêneros musicais (badges)
- Localização (cidade/estado)
- Anos de experiência
- Links de redes sociais (Instagram, YouTube, Spotify) com ícones clicáveis
- Embed de vídeo do YouTube (opcional)

**Alterações necessárias:**
- Ampliar tabela `artists` com novos campos
- Atualizar `ArtistProfile.tsx` para exibir todas as informações
- Atualizar `ArtistForm.tsx` (admin) para editar todos os campos
- Transferir dados de `artist_submissions` ao aprovar

---

### Prioridade 2: Filtros no Casting (Experiência do Contratante)

**Problema atual:** A página `/casting` lista todos os artistas sem filtros. Contratantes precisam encontrar artistas por categoria, gênero ou localização.

**Solução:**
- Adicionar filtros por categoria (Cantor, DJ, etc.)
- Adicionar filtros por gênero musical
- Adicionar filtros por estado
- Adicionar campo de busca por nome

---

### Prioridade 3: Página Institucional "Sobre a 7 Produtora"

**Problema atual:** Não existe uma página que apresente a empresa, gere confiança e mostre resultados.

**Solução - Criar página `/sobre` com:**
- História e missão da empresa
- Equipe (opcional - fotos e nomes)
- Números/métricas (artistas gerenciados, shows realizados, anos no mercado)
- Diferenciais e metodologia
- Parceiros/clientes (logos)
- CTA para artistas e contratantes

---

### Prioridade 4: Formulário de Contato/Orçamento

**Problema atual:** O único canal de contato é WhatsApp. Alguns contratantes preferem enviar solicitações formais.

**Solução:**
- Formulário na página do artista: "Solicitar Orçamento"
- Campos: nome, empresa, email, telefone, tipo de evento, data, mensagem
- Salvar no banco e enviar email para admin
- Página geral de contato (`/contato`)

---

### Prioridade 5: Sistema de Notificações por Email

**Problema atual:** Artistas não recebem feedback após enviar cadastro.

**Solução (usando Resend):**
- Email de confirmação ao enviar solicitação
- Email de aprovação (com link do perfil)
- Email de rejeição (com motivo opcional)
- Email de novo orçamento recebido (para admin)

---

### Prioridade 6: Depoimentos e Prova Social

**Problema atual:** Falta validação social de artistas que já fazem parte do casting.

**Solução:**
- Seção de depoimentos na página `/seja-artista`
- Carousel com foto, nome e texto do depoimento
- Admin pode adicionar/editar depoimentos

---

### Prioridade 7: Badge de Notificações no Admin

**Problema atual:** Admin não vê quantas solicitações pendentes existem no menu lateral.

**Solução:**
- Badge vermelho no menu "Solicitações" mostrando contagem de pendentes
- Atualização em tempo real

---

### Prioridade 8: Área Logada para Artistas (Opcional/Futuro)

**Problema atual:** Artistas aprovados não conseguem atualizar seu próprio perfil.

**Solução:**
- Login para artistas aprovados
- Dashboard próprio para editar bio, fotos, redes sociais
- Visualizar estatísticas do perfil

---

### Resumo das Prioridades

| Prioridade | Feature | Impacto |
|------------|---------|---------|
| 1 | Perfil completo do artista | Alto - Credibilidade para contratantes |
| 2 | Filtros no casting | Alto - Experiência do contratante |
| 3 | Página "Sobre" | Alto - Credibilidade institucional |
| 4 | Formulário de contato/orçamento | Médio - Canal alternativo |
| 5 | Notificações por email | Médio - Experiência do artista |
| 6 | Depoimentos | Médio - Prova social |
| 7 | Badge de notificações | Baixo - UX do admin |
| 8 | Área logada artistas | Baixo - Futuro |

---

### Recomendação de Implementação

Sugiro começar pelas **Prioridades 1, 2 e 3** que são as que mais impactam a credibilidade da plataforma:

1. **Perfil completo** - faz os artistas parecerem profissionais
2. **Filtros no casting** - facilita a vida do contratante
3. **Página Sobre** - mostra que a 7 Produtora é uma empresa séria

---

### Detalhes Técnicos

**Alterações no banco de dados:**
```text
Tabela artists (campos a adicionar):
- category: text
- city: text  
- state: text
- experience_years: integer
- genres: text[]
- instagram: text
- youtube: text
- spotify: text
- youtube_video_url: text (para embed)

Nova tabela testimonials:
- id, name, role, content, image_url, is_visible, order_index

Nova tabela contact_requests:
- id, artist_id, name, company, email, phone, event_type, event_date, message, created_at, status
```

**Novos arquivos a criar:**
- `src/pages/About.tsx` - Página institucional
- `src/pages/Contact.tsx` - Formulário de contato geral
- `src/components/TestimonialsSection.tsx` - Depoimentos
- `src/components/ArtistFilters.tsx` - Filtros do casting
- `supabase/functions/send-notification-email/index.ts` - Edge function para emails

**Arquivos a modificar:**
- `src/pages/ArtistProfile.tsx` - Exibir novos campos
- `src/pages/Casting.tsx` - Adicionar filtros
- `src/pages/admin/ArtistForm.tsx` - Editar novos campos
- `src/pages/admin/ArtistSubmissions.tsx` - Transferir todos os dados ao aprovar
- `src/components/admin/AdminSidebar.tsx` - Badge de notificações
- `src/App.tsx` - Novas rotas

