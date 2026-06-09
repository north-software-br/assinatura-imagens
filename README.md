# Gerador de Assinatura de E-mail

Ferramenta interna para geração de assinaturas de e-mail padronizadas.

Construído com **React + TypeScript + Vite**.

---

## Marcas (perfis de publicação)

O **mesmo código-fonte** é publicado em duas URLs/portas distintas. A variável
`VITE_BRAND` decide quais empresas aparecem e se o seletor de abas é exibido:

| Marca       | `VITE_BRAND` | Empresas                | Abas | Porta |
|-------------|--------------|-------------------------|------|-------|
| Antonelly   | `antonelly`  | Antonelly               | não  | 3100  |
| Grupo       | `grupo`      | ELP, LPG, Office 145    | sim  | 3200  |

Os perfis são definidos em [`src/data/brands.ts`](src/data/brands.ts); os dados
de cada empresa ficam em [`src/data/companies.ts`](src/data/companies.ts).

---

## Desenvolvimento local

### Pré-requisitos

- Node.js 18+ e npm

### Rodar em modo dev

```bash
npm install
npm run dev            # perfil "grupo" (ELP, LPG, Office 145)
npm run dev:antonelly  # perfil "antonelly"
```

### Build de produção

```bash
npm run build:antonelly  # gera dist/antonelly
npm run build:grupo      # gera dist/grupo
npm run build:all        # gera as duas
```

---

## Deploy na VM (Ubuntu/Debian)

### Pré-requisitos

- VM com Ubuntu ou Debian, acesso SSH e Nginx instalado

### Publicar

Na sua máquina local, dentro da pasta do projeto:

```bash
./deploy.sh SEU_USUARIO 10.12.25.48            # publica as duas marcas
./deploy.sh SEU_USUARIO 10.12.25.48 antonelly  # só Antonelly (porta 3100)
./deploy.sh SEU_USUARIO 10.12.25.48 grupo      # só Grupo (porta 3200)
```

Para cada marca, o script:
- Gera o build com a `VITE_BRAND` correta
- Envia o `dist/<marca>/` via rsync para sua pasta na VM
  (`/var/www/assinatura-antonelly` ou `/var/www/assinatura-grupo`)
- Instala/ativa o site nginx correspondente e recarrega o nginx

### Liberar as portas no firewall

```bash
sudo ufw allow 3100/tcp
sudo ufw allow 3200/tcp
sudo ufw reload
```

### Acessar

```
http://10.12.25.48:3100   # Antonelly
http://10.12.25.48:3200   # Grupo (ELP, LPG, Office 145)
```

---

## Estrutura do projeto

```
assinatura-email/
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── theme.css
│   ├── types.ts
│   ├── data/
│   │   ├── brands.ts       # Perfis de publicação (antonelly / grupo)
│   │   └── companies.ts    # Dados de cada empresa
│   ├── components/
│   │   ├── CompanyTabs.tsx
│   │   ├── SignatureForm.tsx
│   │   ├── SignaturePreview.tsx
│   │   └── ui/
│   ├── hooks/
│   │   └── useCopySignature.ts
│   └── lib/
│       ├── signatureTemplate.ts
│       └── utils.ts
├── .env.antonelly          # VITE_BRAND=antonelly
├── .env.grupo              # VITE_BRAND=grupo
├── nginx-antonelly.conf    # Site nginx — porta 3100
├── nginx-grupo.conf        # Site nginx — porta 3200
└── deploy.sh               # Build + deploy via SSH (por marca ou ambas)
```
