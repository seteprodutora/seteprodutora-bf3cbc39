
## Plano: Atualizar Página "Sobre" com Informações Reais

Vou ajustar a página `/sobre` para refletir a realidade atual da 7 Produtora, removendo estatísticas infladas e focando nos serviços oferecidos.

---

### Alterações Planejadas

**1. Remover seção de estatísticas numéricas**
A seção atual mostra "50+ Artistas", "200+ Shows" e "5+ Anos" que não correspondem à realidade. Vou substituí-la por uma apresentação dos pilares de serviço.

**2. Nova seção: "O Que Entregamos"**
Substituir as estatísticas por cards destacando os 7 pilares de serviço:
- Psicologia (suporte mental)
- Jurídico (contratos e direitos)
- Produção (gravação e mixagem)
- Branding (identidade visual)
- Marketing (tráfego e redes)
- Vendas (negociação de shows)
- Planejamento (estratégia de carreira)

**3. Atualizar texto da "Nossa História"**
- Remover "dezenas de artistas em todo o Brasil" 
- Ajustar para linguagem de empresa nova no mercado
- Manter o posicionamento de empresa jovem com metodologia sólida

---

### Arquivo a Modificar

**`src/pages/About.tsx`**
- Remover array `stats` com números inflados
- Remover seção que renderiza estatísticas numéricas
- Criar nova seção "O Que Entregamos" com os serviços
- Atualizar parágrafo da história para refletir 1 ano de mercado

---

### Resultado Visual Esperado

**Antes:**
```
50+ Artistas | 200+ Shows | 5+ Anos | 360° Gestão
```

**Depois:**
```
[Ícone] Psicologia    [Ícone] Jurídico     [Ícone] Produção
[Ícone] Branding      [Ícone] Marketing    [Ícone] Vendas
                 [Ícone] Planejamento
```

Cada card terá ícone + título + breve descrição do serviço.
