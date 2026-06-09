# Especificação — Gerador de Assinaturas Multi-Empresa

## 1. Visão geral

Expandir o gerador de assinaturas de e-mail (hoje exclusivo da **Antonelly**) para
atender múltiplas empresas do grupo **reutilizando a mesma estrutura, layout e
funcionalidades**. A seleção da empresa é feita por **abas (tabs)**, e cada empresa
fornece apenas seus dados visuais/institucionais. O formulário e toda a lógica de
geração/cópia são compartilhados.

Empresas iniciais: **Antonelly, ELP, LPG, Empresa 4** (as três últimas começam com
dados placeholder, editáveis em um único arquivo).

## 2. Requisitos

### 2.1 Deve mudar por empresa
- Logo (cabeçalho da assinatura) e logo de certificações.
- Paleta de cores (cor da marca / cor de destaque).
- Links de redes sociais e site.
- Informações institucionais (nome legal, telefone, endereço, domínio de e-mail).

### 2.2 Deve permanecer igual (compartilhado)
- Layout e estrutura HTML da assinatura.
- Campos do formulário (`nome`, `cargo`, `setor`, `emailUser`).
- Preview em tempo real.
- Cópia da assinatura (rich text via seleção + `execCommand`).
- Responsividade e instruções de uso.
- Lógica de geração da assinatura.

### 2.3 Escalabilidade
- Adicionar uma nova empresa = adicionar **um objeto** ao array `companies`.
  Nenhum componente novo, nenhuma tela duplicada.

## 3. Arquitetura e componentes

| Arquivo | Responsabilidade |
|---|---|
| `src/data/companies.ts` | Fonte única de verdade: interface `CompanyConfig` + array `companies`. |
| `src/types.ts` | `SignatureData` (dados do colaborador, inalterado). |
| `src/utils/templates/signatureTemplate.ts` | `generateSignature(data, company)` — template parametrizado, **zero** valores fixos de empresa. |
| `src/components/SignatureForm.tsx` | Formulário compartilhado; recebe a empresa ativa para mostrar o sufixo de e-mail e cor do botão. |
| `src/components/SignaturePreview.tsx` | Renderiza o HTML gerado para a empresa ativa. |
| `src/components/ui/tabs.tsx` | Componente shadcn `tabs-05`. |
| `src/App.tsx` | Orquestra: abas por empresa, estado do formulário, cópia. |

### 3.1 Fluxo de dados
```
companies[] ──► App (empresa ativa via tab)
                 │
   SignatureData │ company
        ▼        ▼
   SignatureForm / SignaturePreview ──► generateSignature(data, company)
```

O estado do formulário (`SignatureData`) é **mantido ao trocar de aba**, pois é
compartilhado entre empresas — muda apenas a configuração visual aplicada.

## 4. Estrutura de dados (`CompanyConfig`)

```ts
interface CompanyConfig {
  id: string;                 // slug único, usado como value da tab
  name: string;               // rótulo curto da aba
  legalName: string;          // nome institucional exibido na assinatura
  emailDomain: string;        // ex.: "@antonelly.com.br"
  phone: { tel: string; label: string };
  address: string;
  website: { url: string; label: string };
  logo: { src: string; width: number; height: number };
  certifications?: { src: string; width: number; height: number };
  social: { instagram?: string; linkedin?: string; facebook?: string };
  colors: {
    brand: string;            // cor escura: nome + divisória (rgb "r,g,b")
    accent: string;           // cor de destaque: site + ícones (rgb "r,g,b")
    muted: string;            // texto secundário (rgb "r,g,b")
  };
  icons: {                    // URLs dos ícones (coloridos por marca)
    email: string; phone: string; map: string;
    website: string; instagram: string; linkedin: string;
  };
}
```

Cores em formato `"r,g,b"` para encaixar direto em `rgb(...)` no HTML de e-mail
(clientes de e-mail preferem cores absolutas inline).

## 5. Abas (UI)

- Componente: **shadcn `@shadcn-space/tabs-05`** (requer Tailwind + shadcn).
- Uma aba por item de `companies` (renderização automática via `.map`).
- Ao selecionar uma aba: logo, cores, sufixo de e-mail e preview passam a refletir a
  empresa escolhida. O formulário permanece preenchido.
- O cabeçalho da página mostra o logo da empresa ativa.

## 6. Critérios de aceite

1. Trocar de aba troca logo, cores, site e dados institucionais da assinatura.
2. O preview atualiza em tempo real ao digitar, para qualquer empresa.
3. "Copiar Assinatura" copia o HTML rico correto da empresa ativa.
4. Adicionar uma empresa nova exige apenas editar `companies.ts`.
5. Layout, responsividade e instruções permanecem idênticos ao sistema atual.
6. `npm run build` e `npm run lint` passam.
