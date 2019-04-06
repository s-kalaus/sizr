#!/bin/sh

PROXY_PASSWORD=${1:-password}

DIGEST="$( printf "%s:%s:%s" "sizr" "dev" "$PROXY_PASSWORD" | md5sum | awk '{print $1}' )"
printf "%s:%s:%s\n" "sizr" "dev" "$DIGEST" >> "/etc/squid/passwords"

service squid start

nginx

tail -f /dev/null
