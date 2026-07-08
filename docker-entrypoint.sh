#!/bin/sh
set -e

# Railway injects PORT env var; fallback ke 80 untuk environment lain (GitLab CI, local)
export PORT="${PORT:-80}"

# Ganti listen directive di nginx.conf dengan port dari environment
sed -i "s/listen 80;/listen ${PORT};/g" /etc/nginx/nginx.conf

exec nginx -g "daemon off;"
