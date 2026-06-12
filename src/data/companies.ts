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
      "Av. Amazonas Cavalcante, 25 - Parque 10, Manaus",
    website: { url: "https://antonelly.com.br/", label: "antonelly.com.br" },
    logo: {
      src: "https://cdn.jsdelivr.net/gh/north-software-br/assinatura-imagens@main/public/images/antonelly-logo.svg",
      width: 93,
      height: 88,
    },
    certifications: {
      src: "https://cdn.jsdelivr.net/gh/north-software-br/assinatura-imagens@main/public/images/certificacoes.svg",
      width: 120,
      height: 16,
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
    legalName: "ELP Construções e Serviços",
    emailDomain: "@elpconstrucoes.com.br",
    phone: { tel: "+5592992084344", label: "+55 92 99208-4344" },
    address: "Rua Rio De Janeiro, 145 - Flores, Manaus",
    website: { url: "http://elpconstrucoeseservicos.com", label: "elpconstrucoeseservicos.com" },
    logo: {
      src: "https://cdn.jsdelivr.net/gh/north-software-br/assinatura-imagens@main/public/images/elp.svg",
      width: 120,
      height: 37,
    },
      certifications: {
      src: "https://cdn.jsdelivr.net/gh/north-software-br/assinatura-imagens@main/public/images/certificacoes.svg",
      width: 120,
      height: 16,
    },
    social: {
      instagram: "https://www.instagram.com/elpservicos/",
    },
    colors: {
      brand: "#1f2937",
      accent: "#f44c03",
      muted: "#888888",
    },
  },
  {
    id: "lpg",
    name: "LPG",
    legalName: "LPG Serviços",
    emailDomain: "@lpgservicos.com.br",
    phone: { tel: "+5592991050170", label: "+55 92 99105-0170" },
    address: "Rua Rio De Janeiro, 145 - Flores, Manaus",
    website: { url: "https://lpgservicos.com.br/", label: "lpgservicos.com.br" },
    logo: {
      src: "https://cdn.jsdelivr.net/gh/north-software-br/assinatura-imagens@main/public/images/lpg.svg",
      width: 70,
      height: 68,
    },
    social: {
    },
    colors: {
      brand: "#3b2f2f",
      accent: "#ee3342",
      muted: "#888888",
    },
  },
  {
    id: "office145",
    name: "Office 145",
    legalName: "Office 145",
    emailDomain: "@office145.com.br",
    phone: { tel: "+5592993882427", label: "+55 92 99388-2427" },
    address: "Rua Rio De Janeiro, 145 - Flores, Manaus",
    website: { url: "https://office145.com.br/", label: "office145.com.br" },
    logo: {
      src: "https://cdn.jsdelivr.net/gh/north-software-br/assinatura-imagens@main/public/images/office.svg",
      width: 110,
      height: 70,
    },
    social: {
      instagram: "https://www.instagram.com/office145.am/",
    },
    colors: {
      brand: "#1f2937",
      accent: "#ff5d00",
      muted: "#888888",
    },
  },
];

export const defaultCompany = companies[0];
