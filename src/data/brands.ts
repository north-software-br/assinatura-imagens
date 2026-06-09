/**
 * Perfis de publicação ("brands").
 *
 * O mesmo código-fonte é publicado em URLs diferentes; cada URL faz o build com
 * uma `VITE_BRAND` distinta, que decide QUAIS empresas aparecem e se o seletor
 * de abas é exibido. As empresas em si continuam vivendo em `companies.ts` —
 * aqui só escolhemos o subconjunto.
 *
 *   VITE_BRAND=antonelly  → só Antonelly, abre direto, sem abas.
 *   VITE_BRAND=grupo      → ELP, LPG e Office 145, com abas. (default)
 *
 * Para criar um novo recorte, basta acrescentar uma entrada a `brands`.
 */
import { companies, type CompanyConfig } from "./companies";

export interface BrandConfig {
  /** Slug do perfil — casa com o valor de `VITE_BRAND`. */
  id: string;
  /** Empresas visíveis neste perfil, na ordem em que aparecem. */
  companies: CompanyConfig[];
  /** Exibir o seletor de abas? (false quando há uma única empresa). */
  showTabs: boolean;
}

/** Retorna as empresas de `companies.ts` na ordem dos ids informados. */
function pick(ids: string[]): CompanyConfig[] {
  return ids.map((id) => {
    const company = companies.find((c) => c.id === id);
    if (!company) {
      throw new Error(`Empresa "${id}" não encontrada em companies.ts`);
    }
    return company;
  });
}

const DEFAULT_BRAND = "grupo";

const brands: Record<string, Omit<BrandConfig, "id">> = {
  antonelly: {
    companies: pick(["antonelly"]),
    showTabs: false,
  },
  grupo: {
    companies: pick(["elp", "lpg", "office145"]),
    showTabs: true,
  },
};

/** Perfil ativo, resolvido a partir de `VITE_BRAND` (com fallback no default). */
export const activeBrand: BrandConfig = (() => {
  const id = import.meta.env.VITE_BRAND?.trim() || DEFAULT_BRAND;
  const config = brands[id];

  if (!config) {
    const available = Object.keys(brands).join(", ");
    throw new Error(
      `VITE_BRAND="${id}" inválido. Perfis disponíveis: ${available}.`,
    );
  }

  // `showTabs` nunca faz sentido com uma única empresa, independente do config.
  return {
    id,
    ...config,
    showTabs: config.showTabs && config.companies.length > 1,
  };
})();
