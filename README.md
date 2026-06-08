# Gerador de Assinatura de E-mail — Antonelly

Ferramenta interna para geração de assinaturas de e-mail padronizadas para os colaboradores da Antonelly.

Construído com **React + TypeScript + Vite**.

---

## Desenvolvimento local

### Pré-requisitos

- Node.js 18+ e npm

### Rodar em modo dev

```bash
npm install
npm run dev
```

### Build de produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/`.

---

## Deploy na VM (Ubuntu/Debian)

### Pré-requisitos

- VM com Ubuntu ou Debian
- Acesso SSH à VM
- Nginx instalado

### Enviar para a VM

Na sua máquina local, dentro da pasta do projeto, rode:

```bash
./deploy.sh SEU_USUARIO 10.12.25.48
```

O script vai:
- Instalar dependências e gerar o build (`npm install && npm run build`)
- Criar a pasta `/var/www/assinatura-ant` na VM
- Enviar o conteúdo de `dist/` via rsync
- Configurar o nginx automaticamente
- Recarregar o nginx

### Liberar a porta no firewall

```bash
sudo ufw allow 3200/tcp
sudo ufw reload
```

### Acessar

```
http://10.12.25.48:3200
```

---

## Estrutura do projeto

```
assinatura-ant/
├── index.html
├── public/
│   └── images/
│       └── logos-certificacoes.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── types.ts
│   ├── components/
│   │   ├── SignatureForm.tsx
│   │   └── SignaturePreview.tsx
│   └── utils/
│       └── templates/
│           └── signatureTemplate.ts
├── nginx.conf       # Configuração do nginx (porta 3200)
└── deploy.sh        # Script de build + deploy via SSH
```
