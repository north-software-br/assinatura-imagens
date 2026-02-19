#!/bin/bash
# Deploy script - Gerador de Assinatura Antonelly
# Uso: ./deploy.sh SEU_USUARIO SEU_IP_DA_VM
# Exemplo: ./deploy.sh ubuntu 192.168.1.100

USER=${1:-antonelly}
HOST=${2:-10.12.25.48}
DEST="/var/www/assinatura-ant"

echo "==> Enviando arquivos para $USER@$HOST:$DEST"

ssh "$USER@$HOST" "sudo mkdir -p $DEST && sudo chown $USER:$USER $DEST"

rsync -avz --exclude='.git' --exclude='deploy.sh' --exclude='nginx.conf' \
  index.html css/ js/ templates/ \
  "$USER@$HOST:$DEST/"

echo "==> Configurando nginx"
scp nginx.conf "$USER@$HOST:/tmp/assinatura-ant.conf"
ssh "$USER@$HOST" "
  sudo cp /tmp/assinatura-ant.conf /etc/nginx/sites-available/assinatura-ant &&
  sudo ln -sf /etc/nginx/sites-available/assinatura-ant /etc/nginx/sites-enabled/assinatura-ant &&
  sudo rm -f /etc/nginx/sites-enabled/default &&
  sudo nginx -t && sudo systemctl reload nginx
"

echo "==> Deploy concluído! Acesse: http://$HOST"
