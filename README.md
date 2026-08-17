# Portfólio — Diego Sousa dos Santos

Portfólio pessoal em Next.js (App Router) + TypeScript + Tailwind CSS.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Estrutura

- `src/app/layout.tsx` — fontes (Space Grotesk, JetBrains Mono, Inter via `next/font/google`) e metadados de SEO
- `src/app/page.tsx` — apenas renderiza o componente principal
- `src/components/Portfolio.tsx` — toda a página (hero, sobre, stack, experiência, projetos, contato)
- `src/app/globals.css` — tokens de cor e estilos globais

## Editar conteúdo

Os textos e dados ficam em constantes no topo de `src/components/Portfolio.tsx`:
- `SKILL_LAYERS` — stack técnica por camada
- `EXPERIENCE` — histórico profissional (estilo git log)
- `PROJECTS` — projetos em destaque

Edite os arrays diretamente — não precisa mexer no JSX.

## Deploy na Vercel

1. Suba este projeto para um repositório no GitHub
2. Acesse https://vercel.com/new e importe o repositório
3. A Vercel detecta Next.js automaticamente — não precisa configurar nada
4. Clique em "Deploy"

Alternativa via CLI:

```bash
npm install -g vercel
vercel
```

## Build de produção

```bash
npm run build
npm start
```
