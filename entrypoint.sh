#!/bin/sh
set -e

# Замінюємо змінну середовища в конфіг файлі
envsubst < /usr/share/nginx/html/assets/config.template.json > /usr/share/nginx/html/assets/config.json

exec nginx -g "daemon off;"
