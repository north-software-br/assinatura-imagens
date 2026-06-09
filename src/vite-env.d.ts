/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Perfil de publicação ativo. Ver `src/data/brands.ts`. */
  readonly VITE_BRAND?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
