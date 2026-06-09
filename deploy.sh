#!/bin/bash
# Deploy script - Gerador de Assinatura
# Uso: ./deploy.sh [USUARIO] [IP_DA_VM] [MARCA]
#   MARCA: antonelly | grupo | all   (padrão: all)
# Exemplos:
#   ./deploy.sh ubuntu 192.168.1.100            # publica as duas marcas
#   ./deploy.sh ubuntu 192.168.1.100 antonelly  # só Antonelly (porta 3100)
#   ./deploy.sh ubuntu 192.168.1.100 grupo      # só Grupo (porta 3200)
set -e

USER=${1:-antonelly}
HOST=${2:-10.12.25.48}
BRAND=${3:-all}

# Publica uma marca: build + envio + nginx.
#   $1 marca | $2 pasta no servidor | $3 arquivo nginx | $4 porta
deploy_one() {
  local brand=$1 dest=$2 conf=$3 port=$4

  echo "==> [$brand] Buildando (VITE_BRAND=$brand)"
  npm run "build:$brand"

  echo "==> [$brand] Enviando para $USER@$HOST:$dest"
  ssh -t "$USER@$HOST" "sudo mkdir -p $dest && sudo chown $USER:$USER $dest"
  rsync -avz --delete "dist/$brand/" "$USER@$HOST:$dest/"

  echo "==> [$brand] Configurando nginx (porta $port)"
  scp "$conf" "$USER@$HOST:/tmp/assinatura-$brand.conf"
  ssh -t "$USER@$HOST" "
    sudo cp /tmp/assinatura-$brand.conf /etc/nginx/sites-available/assinatura-$brand &&
    sudo ln -sf /etc/nginx/sites-available/assinatura-$brand /etc/nginx/sites-enabled/assinatura-$brand &&
    sudo nginx -t && sudo systemctl reload nginx
  "

  echo "==> [$brand] OK: http://$HOST:$port"
}

echo "==> Instalando dependências"
npm install

case "$BRAND" in
  antonelly)
    deploy_one antonelly /var/www/assinatura-antonelly nginx-antonelly.conf 3100
    ;;
  grupo)
    deploy_one grupo /var/www/assinatura-grupo nginx-grupo.conf 3200
    ;;
  all)
    deploy_one antonelly /var/www/assinatura-antonelly nginx-antonelly.conf 3100
    deploy_one grupo /var/www/assinatura-grupo nginx-grupo.conf 3200
    ;;
  *)
    echo "MARCA inválida: '$BRAND'. Use: antonelly | grupo | all" >&2
    exit 1
    ;;
esac

echo "==> Deploy concluído!"
