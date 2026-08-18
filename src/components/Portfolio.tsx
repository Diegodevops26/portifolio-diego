"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Menu,
  X,
  ArrowUpRight,
  GitBranch,
  GitCommit,
} from "lucide-react";

/* lucide-react dropped brand marks, so GitHub/LinkedIn are inline SVGs */
function GithubIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.65 1.24 3.3.95.1-.73.4-1.24.72-1.53-2.52-.29-5.17-1.26-5.17-5.61 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.36-2.65 5.32-5.18 5.6.41.35.77 1.04.77 2.11 0 1.52-.01 2.75-.01 3.12 0 .3.2.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}
function LinkedinIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

/* ---------- design tokens ----------
  bg          #0A0F1A
  panel       #0F1729
  grid        rgba(94,234,212,0.06)
  border      rgba(148,163,184,0.14)
  cyan        #5EEAD4
  blue        #60A5FA
  amber       #FBBF24
  text        #E7ECF5
  muted       #8B95AB
  display     'Space Grotesk'
  mono        'JetBrains Mono'
------------------------------------ */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible] as const;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(18px)",
        transition: `opacity 0.7s cubic-bezier(.22,.61,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,.61,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-10">
      <span
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#5EEAD4" }}
        className="text-xs sm:text-sm tracking-widest"
      >
        {tag}
      </span>
      <span style={{ background: "rgba(148,163,184,0.18)" }} className="h-px flex-1" />
      <h2
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E7ECF5" }}
        className="text-xl sm:text-2xl font-semibold whitespace-nowrap"
      >
        {title}
      </h2>
    </div>
  );
}

/* ---------------- Hero architecture diagram ---------------- */
function HeroDiagram() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 250);
    return () => clearTimeout(t);
  }, []);

  const nodes = [
    { key: "frontend", label: "FRONTEND", sub: "React · Next.js · TS", x: 405, y: 40 },
    { key: "analise", label: "ANÁLISE & SISTEMAS", sub: "Requisitos · Modelagem", x: 405, y: 130 },
    { key: "backend", label: "BACKEND & DADOS", sub: "Node · Flask · SQL", x: 405, y: 220 },
    { key: "ferramentas", label: "FERRAMENTAS", sub: "Git · Docker · QA", x: 405, y: 310 },
  ];
  const cx = 130, cy = 175;

  return (
    <svg viewBox="0 0 520 360" className="w-full h-auto max-w-md" role="img" aria-label="Diagrama de arquitetura: Diego Santos conectado às suas áreas de atuação">
      <defs>
        <pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 22 0 L 0 0 0 22" fill="none" stroke="rgba(94,234,212,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="520" height="360" fill="url(#grid)" />

      {nodes.map((n, i) => {
        const midX = (cx + n.x) / 2;
        const len = 260;
        return (
          <path
            key={n.key}
            d={`M ${cx + 78} ${cy} C ${midX} ${cy}, ${midX} ${n.y}, ${n.x - 4} ${n.y}`}
            fill="none"
            stroke="#5EEAD4"
            strokeWidth="1.5"
            strokeDasharray={len}
            strokeDashoffset={drawn ? 0 : len}
            style={{
              transition: `stroke-dashoffset 1s cubic-bezier(.22,.61,.36,1) ${0.15 * i + 0.1}s`,
              opacity: 0.55,
            }}
          />
        );
      })}

      {/* central node */}
      <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <rect x={cx - 78} y={cy - 32} width="156" height="64" rx="6" fill="#0F1729" stroke="#5EEAD4" strokeWidth="1.5" />
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#E7ECF5" fontFamily="'Space Grotesk', sans-serif" fontWeight="600" fontSize="13">
          Diego Sousa
        </text>
        <text x={cx} y={cy + 15} textAnchor="middle" fill="#8B95AB" fontFamily="'JetBrains Mono', monospace" fontSize="9.5">
          analista_sistemas.ts
        </text>
      </g>

      {nodes.map((n, i) => (
        <g
          key={n.key}
          style={{
            opacity: drawn ? 1 : 0,
            transform: drawn ? "translateX(0px)" : "translateX(12px)",
            transition: `opacity 0.5s ease ${0.15 * i + 0.55}s, transform 0.5s ease ${0.15 * i + 0.55}s`,
          }}
        >
          <rect x={n.x} y={n.y - 20} width="112" height="40" rx="5" fill="#0A0F1A" stroke="rgba(148,163,184,0.35)" strokeWidth="1" />
          <circle cx={n.x + 12} cy={n.y} r="3" fill="#FBBF24" />
          <text x={n.x + 22} y={n.y - 3} fill="#E7ECF5" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fontWeight="600">
            {n.label}
          </text>
          <text x={n.x + 22} y={n.y + 10} fill="#8B95AB" fontFamily="'JetBrains Mono', monospace" fontSize="7.5">
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------------- Data ---------------- */
const SKILL_LAYERS = [
  {
    layer: "Camada de Apresentação",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Styled Components", "SASS"],
  },
  {
    layer: "Camada de Análise",
    items: ["Levantamento de Requisitos", "Modelagem de Sistemas", "Documentação Técnica", "Metodologias Ágeis", "Swagger"],
  },
  {
    layer: "Camada de Dados & Backend",
    items: ["Python (Flask)", "Node.js", "SQL (MySQL)", "NoSQL (MongoDB)"],
  },
  {
    layer: "Infraestrutura & Ferramentas",
    items: ["Git", "GitHub", "Docker", "Testes de Software (QA)", "Acessibilidade Web"],
  },
];

const EXPERIENCE = [
  {
    hash: "8f3a21e",
    branch: "main → Ascanovi-ERP",
    date: "2026",
    scope: "feat(erp)",
    title: "Desenvolvedor — ERP para Ascanovi",
    org: "Projeto de Extensão IFNMG",
    body:
      "Atuando no ciclo completo do sistema — requisitos, modelagem e implementação — com React.js, Java/Spring Boot e MySQL, para uma associação de catadores de recicláveis.",
  },
  {
    hash: "c19d4a0",
    branch: "main → fluxozen",
    date: "Jan/2025 — atual",
    scope: "feat(fluxozen)",
    title: "Analista-Desenvolvedor (Projeto Próprio) — FluxoZen Financeiro",
    org: "Projeto próprio",
    body:
      "Análise de requisitos, modelagem e desenvolvimento completo de uma aplicação de gestão financeira com Next.js e Python (Flask). SSR para performance e SEO, dashboard interativo com categorização automática de despesas e integração via API RESTful.",
  },
  {
    hash: "5b7e02f",
    branch: "main → podcasts-ifnmg",
    date: "Jan/2023 — Dez/2023",
    scope: "feat(frontend)",
    title: "Desenvolvedor Front-End — Portal de Podcasts Institucional",
    org: "IFNMG",
    body:
      "Levantamento de requisitos e construção da interface do repositório de podcasts, com design responsivo e acessível. Integração de APIs para listagem e reprodução de mídia em tempo real.",
  },
  {
    hash: "1a44dd9",
    branch: "main → boletim-ifnmg",
    date: "Jan/2022 — Dez/2022",
    scope: "test(qa)",
    title: "QA / Analista de Testes — Boletim Informativo Digital",
    org: "IFNMG",
    body:
      "Planejamento e execução de casos de teste, identificando bugs visuais e lógicos antes do deploy, em colaboração direta com a equipe de desenvolvimento.",
  },
];

const PROJECTS = [
  {
    name: "Ascanovi ERP",
    status: "EM PRODUÇÃO",
    statusColor: "#5EEAD4",
    stack: "React.js · Java/Spring Boot · MySQL",
    desc: "Sistema de gestão completo para uma cooperativa de catadores de recicláveis em Teófilo Otoni — projeto de extensão com parceiros institucionais como Sicoob Credivale e Sebrae.",
  },
  {
    name: "FluxoZen Financeiro",
    status: "EM PRODUÇÃO",
    statusColor: "#5EEAD4",
    stack: "Next.js · Python (Flask)",
    desc: "Aplicação web de gestão financeira pessoal com SSR, dashboard interativo e categorização automática de despesas.",
  },
  {
    name: "Life Organizer",
    status: "DEPLOYED",
    statusColor: "#60A5FA",
    stack: "Next.js · Prisma · PostgreSQL · NextAuth",
    desc: "SaaS de produtividade full-stack com autenticação, verificação de propriedade de dados, filtros de tarefas e sistema de notificações.",
  },
  {
    name: "Decifre o Código",
    status: "CONCLUÍDO",
    statusColor: "#FBBF24",
    stack: "HTML · CSS · JavaScript",
    desc: "Fangame de adivinhação de palavras ambientado no universo Ordem Paranormal, com estética de terminal e mecânicas gamificadas.",
  },
];

/* ---------------- Main component ---------------- */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "sobre", label: "Sobre" },
    { id: "stack", label: "Stack" },
    { id: "experiencia", label: "Experiência" },
    { id: "projetos", label: "Projetos" },
    { id: "contato", label: "Contato" },
  ];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#0A0F1A", minHeight: "100%", fontFamily: "'Inter', sans-serif" }} className="w-full text-slate-200">
      {/* NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: scrolled ? "rgba(10,15,26,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(148,163,184,0.14)" : "1px solid transparent",
          transition: "all .3s ease",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("topo")} className="mono text-sm sm:text-base" style={{ color: "#E7ECF5" }}>
            <span style={{ color: "#5EEAD4" }}>~/</span>diego<span style={{ color: "#8B95AB" }}>.dev</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="nav-link mono text-xs tracking-wide"
                style={{ color: "#B7C0D1" }}
              >
                {n.label}
              </button>
            ))}
            <a
              href="#contato"
              onClick={(e) => { e.preventDefault(); scrollTo("contato"); }}
              className="mono text-xs px-4 py-2 rounded"
              style={{ border: "1px solid #5EEAD4", color: "#5EEAD4" }}
            >
              Falar comigo
            </a>
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menu">
            {menuOpen ? <X size={22} color="#E7ECF5" /> : <Menu size={22} color="#E7ECF5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-5 pb-5 flex flex-col gap-4" style={{ background: "rgba(10,15,26,0.97)" }}>
            {navItems.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="mono text-sm text-left" style={{ color: "#B7C0D1" }}>
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="topo" className="max-w-6xl mx-auto px-5 sm:px-8 pt-32 pb-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="mono text-xs sm:text-sm mb-5" style={{ color: "#5EEAD4" }}>
            <span style={{ color: "#8B95AB" }}>diego@portfolio</span>:~$ whoami<span className="blink">▌</span>
          </div>
          <h1 className="display font-bold leading-[1.05] mb-5" style={{ color: "#E7ECF5", fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
            Diego Santos
          </h1>
          <p className="text-base sm:text-lg mb-2" style={{ color: "#B7C0D1" }}>
            Analista de Sistemas · React.js · Next.js · TypeScript
          </p>
          <p className="text-sm sm:text-base mb-8 max-w-md" style={{ color: "#8B95AB" }}>
            Formação em Análise e Desenvolvimento de Sistemas pelo IFNMG. Do levantamento de requisitos à entrega em produção — construindo interfaces e sistemas com foco em boas práticas e acessibilidade.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={() => scrollTo("contato")}
              className="mono text-xs sm:text-sm px-5 py-3 rounded flex items-center gap-2"
              style={{ background: "#5EEAD4", color: "#0A0F1A", fontWeight: 600 }}
            >
              Falar com Diego <ArrowUpRight size={15} />
            </button>
            <button
              onClick={() => scrollTo("experiencia")}
              className="mono text-xs sm:text-sm px-5 py-3 rounded"
              style={{ border: "1px solid rgba(148,163,184,0.3)", color: "#E7ECF5" }}
            >
              Ver experiência
            </button>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://github.com/Diegodevops26" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: "#8B95AB" }}>
              <GithubIcon size={19} />
            </a>
            <a href="https://linkedin.com/in/diegosousasantosdev" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: "#8B95AB" }}>
              <LinkedinIcon size={19} />
            </a>
            <a href="mailto:sousadiego953@gmail.com" aria-label="Email" style={{ color: "#8B95AB" }}>
              <Mail size={19} />
            </a>
            <span className="mono text-xs flex items-center gap-1.5" style={{ color: "#8B95AB" }}>
              <MapPin size={13} /> Novo Oriente de Minas, MG
            </span>
          </div>
        </div>
        <Reveal delay={0.1} className="flex justify-center md:justify-end">
          <HeroDiagram />
        </Reveal>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <SectionLabel tag="// 01" title="Sobre" />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="grid md:grid-cols-3 gap-8">
            <p className="md:col-span-2 text-base sm:text-lg leading-relaxed" style={{ color: "#B7C0D1" }}>
              Analista de Sistemas em formação pelo <strong style={{ color: "#E7ECF5" }}>IFNMG</strong>, com todas as disciplinas teóricas concluídas e colação prevista para agosto de 2026. Especializo-me em interfaces com React.js, Next.js e TypeScript, mas atuo em todo o ciclo de desenvolvimento — da análise de requisitos e modelagem de sistemas à integração de APIs RESTful e garantia de qualidade.
              <br /><br />
              Disponível para vaga remota, presencial ou mudança de cidade, com disponibilidade total para horário comercial.
            </p>
            <div className="rounded-lg p-5" style={{ background: "#0F1729", border: "1px solid rgba(148,163,184,0.14)" }}>
              <p className="mono text-xs mb-4" style={{ color: "#5EEAD4" }}>status.json</p>
              {[
                ["formação", "IFNMG · previsão ago/2026"],
                ["disponibilidade", "remoto · presencial"],
                ["mudança de cidade", "sim"],
                ["foco atual", "Analista de Sistemas"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between mono text-xs py-2" style={{ borderTop: "1px solid rgba(148,163,184,0.1)" }}>
                  <span style={{ color: "#8B95AB" }}>{k}</span>
                  <span style={{ color: "#E7ECF5", textAlign: "right", marginLeft: "12px" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* STACK */}
      <section id="stack" className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <SectionLabel tag="// 02" title="Stack por camada" />
        </Reveal>
        <div className="space-y-4">
          {SKILL_LAYERS.map((layer, i) => (
            <Reveal key={layer.layer} delay={i * 0.08}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 rounded-lg p-5" style={{ background: "#0F1729", border: "1px solid rgba(148,163,184,0.14)" }}>
                <div className="sm:w-56 shrink-0 flex items-center gap-3">
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: "#FBBF24", display: "inline-block" }} />
                  <p className="mono text-xs sm:text-sm" style={{ color: "#E7ECF5" }}>{layer.layer}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="skill-chip mono text-[11px] sm:text-xs px-3 py-1.5 rounded"
                      style={{ border: "1px solid rgba(148,163,184,0.25)", color: "#B7C0D1" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIÊNCIA */}
      <section id="experiencia" className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <SectionLabel tag="// 03" title="Experiência" />
        </Reveal>
        <div className="relative">
          <div className="absolute left-[9px] top-2 bottom-2 w-px hidden sm:block" style={{ background: "rgba(148,163,184,0.18)" }} />
          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => (
              <Reveal key={exp.hash} delay={i * 0.08}>
                <div className="relative sm:pl-10">
                  <span
                    className="hidden sm:flex absolute left-0 top-1.5 items-center justify-center"
                    style={{ width: 20, height: 20, borderRadius: "50%", background: "#0A0F1A", border: "1.5px solid #5EEAD4" }}
                  >
                    <GitCommit size={11} color="#5EEAD4" />
                  </span>
                  <div className="rounded-lg p-5" style={{ background: "#0F1729", border: "1px solid rgba(148,163,184,0.14)" }}>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mono text-[11px] mb-3" style={{ color: "#8B95AB" }}>
                      <span style={{ color: "#FBBF24" }}>commit {exp.hash}</span>
                      <span className="flex items-center gap-1"><GitBranch size={11} /> {exp.branch}</span>
                      <span>· {exp.date}</span>
                    </div>
                    <p className="mono text-xs mb-1" style={{ color: "#5EEAD4" }}>{exp.scope}</p>
                    <h3 className="display font-semibold text-base sm:text-lg mb-1" style={{ color: "#E7ECF5" }}>{exp.title}</h3>
                    <p className="text-sm mb-3" style={{ color: "#8B95AB" }}>{exp.org}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#B7C0D1" }}>{exp.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <Reveal>
          <SectionLabel tag="// 04" title="Projetos em destaque" />
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <div className="proj-card rounded-lg p-6 h-full" style={{ background: "#0F1729", border: "1px solid rgba(148,163,184,0.14)" }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="display font-semibold text-lg" style={{ color: "#E7ECF5" }}>{p.name}</h3>
                  <span className="mono text-[10px] px-2 py-1 rounded flex items-center gap-1.5" style={{ border: `1px solid ${p.statusColor}`, color: p.statusColor }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.statusColor, display: "inline-block" }} />
                    {p.status}
                  </span>
                </div>
                <p className="mono text-xs mb-3" style={{ color: "#60A5FA" }}>{p.stack}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#B7C0D1" }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORMAÇÃO / EVENTOS */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 grid md:grid-cols-2 gap-10">
        <Reveal>
          <SectionLabel tag="// 05" title="Formação" />
          <div className="rounded-lg p-5" style={{ background: "#0F1729", border: "1px solid rgba(148,163,184,0.14)" }}>
            <h3 className="display font-semibold text-base mb-1" style={{ color: "#E7ECF5" }}>
              Tecnologia em Análise e Desenvolvimento de Sistemas
            </h3>
            <p className="text-sm mb-1" style={{ color: "#B7C0D1" }}>IFNMG — Campus Teófilo Otoni</p>
            <p className="mono text-xs mb-4" style={{ color: "#5EEAD4" }}>Previsão de colação: ago/2026</p>
            <p className="text-sm" style={{ color: "#8B95AB" }}>100% das disciplinas teóricas concluídas — em fase de Projeto de Extensão Final.</p>
            <div className="mt-4 pt-4 space-y-2" style={{ borderTop: "1px solid rgba(148,163,184,0.14)" }}>
              {[
                "Formação React com TypeScript e JavaScript — Alura (2024)",
                "Acessibilidade Web e Documentação de APIs (Swagger) — Alura (2024)",
                "DevOps Essentials — 4Linux",
              ].map((c) => (
                <p key={c} className="text-xs" style={{ color: "#8B95AB" }}>▸ {c}</p>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionLabel tag="// 06" title="Comunidade" />
          <div className="rounded-lg p-5" style={{ background: "#0F1729", border: "1px solid rgba(148,163,184,0.14)" }}>
            <p className="mono text-xs mb-3" style={{ color: "#5EEAD4" }}>eventos</p>
            {["Front In Sampa (2024)", "Build With AI GDG-BH (2025)", "DevFest GDG-BH (2025)"].map((e) => (
              <p key={e} className="text-sm mb-1.5" style={{ color: "#B7C0D1" }}>▸ {e}</p>
            ))}
            <p className="mono text-xs mt-5 mb-3" style={{ color: "#5EEAD4" }}>hackathons</p>
            {["Hackathon Smiles (2021)", "Maratona IBM Behind the Code"].map((e) => (
              <p key={e} className="text-sm mb-1.5" style={{ color: "#B7C0D1" }}>▸ {e}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CONTATO */}
      <section id="contato" className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
        <Reveal>
          <div className="rounded-xl p-8 sm:p-12 text-center" style={{ background: "#0F1729", border: "1px solid rgba(94,234,212,0.25)" }}>
            <p className="mono text-xs mb-4" style={{ color: "#5EEAD4" }}>{"// vamos conversar"}</p>
            <h2 className="display font-bold mb-5" style={{ color: "#E7ECF5", fontSize: "clamp(1.5rem, 4vw, 2.4rem)" }}>
              Aberto a oportunidades como<br />Analista de Sistemas
            </h2>
            <p className="text-sm sm:text-base mb-8 max-w-lg mx-auto" style={{ color: "#8B95AB" }}>
              Disponível para vagas remotas, presenciais ou com mudança de cidade. Resposta rápida por e-mail ou WhatsApp.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <a href="mailto:sousadiego953@gmail.com" className="mono text-xs sm:text-sm px-5 py-3 rounded flex items-center gap-2" style={{ background: "#5EEAD4", color: "#0A0F1A", fontWeight: 600 }}>
                <Mail size={15} /> sousadiego953@gmail.com
              </a>
              <a href="tel:+5533988499183" className="mono text-xs sm:text-sm px-5 py-3 rounded flex items-center gap-2" style={{ border: "1px solid rgba(148,163,184,0.3)", color: "#E7ECF5" }}>
                <Phone size={15} /> (33) 98849-9183
              </a>
            </div>
            <div className="flex items-center justify-center gap-6">
              <a href="https://github.com/Diegodevops26" target="_blank" rel="noreferrer" className="flex items-center gap-2 mono text-xs" style={{ color: "#8B95AB" }}>
                <GithubIcon size={16} /> Diegodevops26
              </a>
              <a href="https://linkedin.com/in/diegosousasantosdev" target="_blank" rel="noreferrer" className="flex items-center gap-2 mono text-xs" style={{ color: "#8B95AB" }}>
                <LinkedinIcon size={16} /> diegosousasantosdev
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="text-center py-8 mono text-[11px] flex items-center justify-center gap-1" style={{ color: "#4B5568" }}>
        diego@portfolio:~$ echo &quot;obrigado pela visita&quot; <ExternalLink size={10} />
      </footer>
    </div>
  );
}
