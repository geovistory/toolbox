#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
DB_MIGRATE_ENV=db
DB_MIGRATE_URL=$DATABASE_URL

if [[ $DB_MIGRATE_URL == *"sslmode=require"* || $DB_MIGRATE_URL == *"ssl=true"* || $GV_DB_SSL == "sslmode=require" ]]; then
    DB_MIGRATE_ENV=dbSSL
fi

echo
IFS='@' read -ra part <<< "$DB_MIGRATE_URL"
echo Run db-migrate on database: ${part[1]}
echo

export DB_MIGRATE_ENV=$DB_MIGRATE_ENV
export DB_MIGRATE_URL=$DB_MIGRATE_URL

$DIR/../node_modules/.bin/db-migrate \
    --config $DIR/config.json \
    --migrations-dir $DIR/migrations \
    down "$@"
