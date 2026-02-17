
## Plano: Notificação por Email para Novas Mensagens de Contato

Toda vez que alguém preencher o formulário de contato, o admin receberá um email com os detalhes da mensagem.

---

### Como Vai Funcionar

```text
[Usuário preenche formulário]
         ↓
[Dados salvos no banco]
         ↓
[Formulário chama função backend]
         ↓
[Função envia email via Resend]
         ↓
[Admin recebe email com detalhes]
```

---

### Tecnologia de Email

Será usado o **Resend** — serviço de envio de emails moderno e confiável. O plano gratuito permite até 3.000 emails/mês, mais que suficiente para este caso.

**Será necessário:**
1. Criar uma conta gratuita em [resend.com](https://resend.com)
2. Gerar uma API Key
3. Informar a API Key para configurar o sistema

---

### Alterações Técnicas

**1. Backend Function (nova): `send-contact-notification`**

Uma função backend que recebe os dados do formulário e envia o email para o admin. O email terá:
- Nome e empresa do contato
- Email e telefone
- Tipo e data do evento
- Mensagem completa
- Link direto para o painel admin

**2. `src/pages/Contact.tsx`**

Após salvar com sucesso no banco, o formulário chamará a nova função backend para disparar o email.

---

### Conteúdo do Email

```
Assunto: 🔔 Nova mensagem de contato - [Nome do contato]

De: [Nome] ([Empresa se tiver])
Email: email@exemplo.com
Telefone: (11) 99999-9999

Tipo de Evento: Casamento
Data do Evento: 15/06/2026

Mensagem:
"Olá, gostaria de contratar um artista para..."

→ Ver no painel admin
```

---

### Etapas de Implementação

1. Solicitar a API Key do Resend ao usuário
2. Criar a função backend `send-contact-notification`
3. Atualizar `src/pages/Contact.tsx` para chamar a função após o envio

---

### Observação

O email de destino (admin) será configurado diretamente no código. Será necessário informar qual email deve receber as notificações, ou será usado o email padrão `contato@7produtora.com.br` que já aparece na página de contato.
