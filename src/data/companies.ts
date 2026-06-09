/**
 * Fonte única de verdade das empresas do grupo.
 *
 * Para adicionar uma nova empresa, basta acrescentar um objeto a `companies`.
 * Nenhum componente precisa ser duplicado — abas, formulário, preview e cópia
 * se ajustam automaticamente.
 *
 * Cores em HEX. No template elas são convertidas para `rgb(r,g,b)` (clientes de
 * e-mail funcionam melhor com cores absolutas inline) e usadas para colorir os
 * ícones via CDN do SignatureHound.
 */
export interface CompanyConfig {
  /** Slug único — usado como value da aba. */
  id: string;
  /** Rótulo curto exibido na aba. */
  name: string;
  /** Nome institucional exibido na 4ª linha da assinatura. */
  legalName: string;
  /** Domínio do e-mail, com @ inicial. Ex.: "@antonelly.com.br". */
  emailDomain: string;
  phone: { tel: string; label: string };
  address: string;
  website: { url: string; label: string };
  /** Logo principal (cabeçalho da assinatura e topo da página). */
  logo: { src: string; width: number; height: number };
  /** Faixa de certificações/selos (opcional). */
  certifications?: { src: string; width: number; height: number };
  social: { instagram?: string; linkedin?: string };
  colors: {
    /** Cor escura — nome do colaborador e divisória vertical. */
    brand: string;
    /** Cor de destaque — site, links e (por padrão) ícones de contato. */
    accent: string;
    /** Texto secundário (cargo, setor, contatos). */
    muted: string;
    /** Cor dos ícones de contato. Default: `accent`. */
    icon?: string;
    /** Cor dos ícones de redes sociais. Default: `accent`. */
    social?: string;
  };
}

export const companies: CompanyConfig[] = [
  {
    id: "antonelly",
    name: "Antonelly",
    legalName: "Antonelly Construções e Serviços",
    emailDomain: "@antonelly.com.br",
    phone: { tel: "+559232363572", label: "+55 92 3236-3572" },
    address:
      "Av. Amazonas Cavalcante, 25 - Parque 10 de Novembro, Manaus -AM, 69054-738",
    website: { url: "https://antonelly.com.br/", label: "antonelly.com.br" },
    logo: {
      src: "https://cdn.jsdelivr.net/gh/north-software-br/assinatura-imagens@main/antonelly-logo.svg",
      width: 100,
      height: 88,
    },
    certifications: {
      src: "https://cdn.jsdelivr.net/gh/north-software-br/assinatura-imagens@main/certificacoes.svg",
      width: 150,
      height: 20,
    },
    social: {
      instagram: "https://www.instagram.com/antonelly.construcoes/",
      linkedin: "https://linkedin.com/company/antonelly",
    },
    colors: {
      brand: "#00353b",
      accent: "#5cab1d",
      muted: "#888888",
      icon: "#5cab1d",
      social: "#92c110",
    },
  },

  // ----------------------------------------------------------------------
  // As empresas abaixo usam DADOS PLACEHOLDER. Ajuste cada campo (logo,
  // cores, site, telefone, endereço, redes e domínio de e-mail) conforme as
  // informações oficiais de cada empresa.
  // ----------------------------------------------------------------------
  {
    id: "elp",
    name: "ELP",
    legalName: "ELP Construçoes e Serviços",
    emailDomain: "@elpconstrucoes.com.br",
    phone: { tel: "+550000000000", label: "+55 00 0000-0000" },
    address: "Endereço da ELP (placeholder)",
    website: { url: "https://elpconstrucoes.com.br/", label: "elpconstrucoes.com.br" },
    logo: {
      src: "https://cdn.jsdelivr.net/gh/north-software-br/assinatura-imagens@main/public/images/elp.svg",
      width: 100,
      height: 88,
    },
    social: {
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    colors: {
      brand: "#1f2937",
      accent: "#2563eb",
      muted: "#888888",
    },
  },
  {
    id: "lpg",
    name: "LPG",
    legalName: "LPG (placeholder)",
    emailDomain: "@lpg.com.br",
    phone: { tel: "+550000000000", label: "+55 00 0000-0000" },
    address: "Endereço da LPG (placeholder)",
    website: { url: "https://lpg.com.br/", label: "lpg.com.br" },
    logo: {
      src: "https://cdn.jsdelivr.net/gh/north-software-br/assinatura-imagens@main/public/images/lpg.svg",
      width: 100,
      height: 88,
    },
    social: {
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    colors: {
      brand: "#3b2f2f",
      accent: "#ea580c",
      muted: "#888888",
    },
  },
  {
    id: "office145",
    name: "Office 145",
    legalName: "Office 145",
    emailDomain: "@office145.com.br",
    phone: { tel: "+550000000000", label: "+55 00 0000-0000" },
    address: "Endereço da Empresa 4 (placeholder)",
    website: { url: "https://empresa4.com.br/", label: "empresa4.com.br" },
    logo: {
      src: "https://cdn.jsdelivr.net/gh/north-software-br/assinatura-imagens@main/public/images/office.svg",
      width: 100,
      height: 88,
    },
    social: {
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
    },
    colors: {
      brand: "#312e81",
      accent: "#7c3aed",
      muted: "#888888",
    },
  },
];

export const defaultCompany = companies[0];
