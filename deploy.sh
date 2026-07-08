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

declare -A DEST=( [antonelly]="/var/www/assinatura-antonelly" [grupo]="/var/www/assinatura-grupo" )
declare -A CONF=( [antonelly]="nginx-antonelly.conf" [grupo]="nginx-grupo.conf" )
declare -A PORT=( [antonelly]=3100 [grupo]=3200 )

case "$BRAND" in
  antonelly|grupo) BRANDS=("$BRAND") ;;
  all) BRANDS=(antonelly grupo) ;;
  *)
    echo "MARCA inválida: '$BRAND'. Use: antonelly | grupo | all" >&2
    exit 1
    ;;
esac

echo "==> Instalando dependências"
npm install

for brand in "${BRANDS[@]}"; do
  echo "==> [$brand] Buildando (VITE_BRAND=$brand)"
  npm run "build:$brand"
  scp "${CONF[$brand]}" "$USER@$HOST:/tmp/assinatura-$brand.conf"
done

# Uma única sessão ssh: pede a senha do sudo apenas uma vez para todo o deploy.
echo "==> Preparando diretórios e nginx no servidor (1 pedido de senha)"
remote_cmd=""
for brand in "${BRANDS[@]}"; do
  remote_cmd+="sudo mkdir -p ${DEST[$brand]} && sudo chown $USER:$USER ${DEST[$brand]} && "
  remote_cmd+="sudo cp /tmp/assinatura-$brand.conf /etc/nginx/sites-available/assinatura-$brand && "
  remote_cmd+="sudo ln -sf /etc/nginx/sites-available/assinatura-$brand /etc/nginx/sites-enabled/assinatura-$brand && "
done
remote_cmd+="sudo nginx -t && sudo systemctl reload nginx"
ssh -t "$USER@$HOST" "$remote_cmd"

for brand in "${BRANDS[@]}"; do
  echo "==> [$brand] Enviando para $USER@$HOST:${DEST[$brand]}"
  rsync -avz --delete "dist/$brand/" "$USER@$HOST:${DEST[$brand]}/"
  echo "==> [$brand] OK: http://$HOST:${PORT[$brand]}"
done

echo "==> Deploy concluído!"
