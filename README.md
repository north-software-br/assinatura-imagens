# Gerador de Assinatura de E-mail — Antonelly

Ferramenta interna para geração de assinaturas de e-mail padronizadas para os colaboradores da Antonelly.

---

## Deploy na VM (Ubuntu/Debian)

### Pré-requisitos

- VM com Ubuntu ou Debian
- Acesso SSH à VM
- Nginx instalado (ou instale com o passo abaixo)

---

### 1. Instalar o Nginx (se ainda não tiver)

```bash
sudo apt update && sudo apt install -y nginx
```

---

### 2. Enviar os arquivos para a VM

Na sua máquina local, dentro da pasta do projeto, rode:

```bash
./deploy.sh SEU_USUARIO SEU_IP
```

**Exemplo:**
```bash
./deploy.sh ubuntu 192.168.1.100
```

O script vai:
- Criar a pasta `/var/www/assinatura-ant` na VM
- Enviar todos os arquivos do projeto
- Configurar o nginx automaticamente
- Recarregar o nginx

---

### 3. Liberar a porta no firewall

```bash
sudo ufw allow 3100/tcp
sudo ufw reload
```

---

### 4. Acessar

Abra no navegador:

```
http://SEU_IP:3100
```

---

## Deploy manual (sem o script)

Caso prefira fazer o processo manualmente:

**Na VM:**
```bash
sudo mkdir -p /var/www/assinatura-ant
sudo chown $USER:$USER /var/www/assinatura-ant
```

**Na sua máquina local:**
```bash
rsync -avz index.html css/ js/ templates/ SEU_USUARIO@SEU_IP:/var/www/assinatura-ant/
scp nginx.conf SEU_USUARIO@SEU_IP:/tmp/assinatura-ant.conf
```

**De volta na VM:**
```bash
sudo cp /tmp/assinatura-ant.conf /etc/nginx/sites-available/assinatura-ant
sudo ln -sf /etc/nginx/sites-available/assinatura-ant /etc/nginx/sites-enabled/assinatura-ant
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

---

## Atualizar o projeto

Para enviar uma nova versão, basta rodar o script de deploy novamente:

```bash
./deploy.sh SEU_USUARIO SEU_IP
```

---

## Estrutura do projeto

```
assinatura-ant/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos
├── js/
│   ├── app.js              # Lógica da interface
│   └── signature-template.js  # Template HTML da assinatura
├── templates/
│   └── assinatura-original.html
├── nginx.conf              # Configuração do nginx (porta 3100)
└── deploy.sh               # Script de deploy via SSH
```
