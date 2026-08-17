import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Diego Sousa dos Santos | Analista de Sistemas",
  description:
    "Portfólio de Diego Sousa dos Santos — Analista de Sistemas especializado em React.js, Next.js e TypeScript. Do levantamento de requisitos à entrega em produção.",
  keywords: [
    "Diego Sousa dos Santos",
    "Analista de Sistemas",
    "React.js",
    "Next.js",
    "TypeScript",
    "Desenvolvedor Front-End",
    "IFNMG",
  ],
  authors: [{ name: "Diego Sousa dos Santos" }],
  openGraph: {
    title: "Diego Sousa dos Santos | Analista de Sistemas",
    description:
      "Do levantamento de requisitos à entrega em produção — React.js, Next.js, TypeScript.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
