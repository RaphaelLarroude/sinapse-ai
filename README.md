# Sinapse AI

A **Sinapse AI** é um hub de inteligências artificiais que reúne as principais ferramentas de IA em um só lugar.

O projeto inclui:

- **Synapse Code**: interface de terminal para programação, criação de sites, aplicativos, scripts e automações. Sua usabilidade é inspirada em ferramentas como Codex, Claude Code, OpenCode e Hermes, mas com identidade, recursos e funcionamento próprios da Sinapse AI.
- **Synapse Work**: hub de chat, estudo, produtividade, escrita e organização.
- **Versão web**, com versões para **Android** e **iPhone** planejadas para o futuro.
- **Calculadora de economia** para comparar assinaturas separadas com o plano Sinapse de R$ 30/mês.
- **Contadores reais** de interesse e votos de plano, salvos pelo backend Node.js.

## Metas da comunidade

| Interessados | Recompensa |
|---:|---|
| 9 | Liberação do preview da Sinapse AI |
| 14 | Geração de imagens ilimitada, sem custo adicional |
| 19 | Geração de música e áudio + ferramenta de estudos com texto em áudio, análise de documentos, resumos e materiais de revisão |
| 25 | Execução de automações em servidores na nuvem, mesmo com o computador do usuário desligado |

## Tecnologias

- Node.js
- Express
- HTML, CSS e JavaScript no frontend
- Armazenamento inicial em arquivo JSON (`data/db.json`)

## Rodar localmente

```bash
npm install
npm start
```

Depois acesse:

```text
http://localhost:3000
```

## APIs disponíveis

### Buscar dados

```http
GET /api/stats
```

### Registrar interesse em assinar

```http
POST /api/support
```

### Votar em um plano

```http
POST /api/plan-vote
Content-Type: application/json

{
  "price": "30"
}
```

Valores aceitos: `"30"`, `"40"` e `"50"`.

## Publicar na Vercel

1. Faça login na [Vercel](https://vercel.com).
2. Clique em **Add New → Project**.
3. Importe o repositório `RaphaelLarroude/sinapse-ai`.
4. A Vercel deve detectar automaticamente o projeto Node.js.
5. Clique em **Deploy**.

> Importante: no plano gratuito da Vercel, arquivos gravados no sistema de arquivos podem não persistir entre execuções serverless. Para uma contagem permanente em produção, conecte um banco de dados como Vercel KV, Supabase, Firebase ou MongoDB Atlas.

## Próximos passos

- Substituir o armazenamento JSON por Vercel KV, Supabase ou Firebase.
- Adicionar autenticação e prevenção de cliques repetidos.
- Criar páginas dedicadas para Synapse Code e Synapse Work.
- Integrar checkout e assinaturas recorrentes.
