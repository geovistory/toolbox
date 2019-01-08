#!/bin/bash

if [ $DB_ENV = 'review' ]
then
cd deployment && bash setup-review-db.sh
fi


if [ $DB_ENV = 'staging' ]
then

echo '======================== Run db-migrate-up ======================'
echo 'db-migrate will use this db-connection: '$DATABASE_URL
echo 'with this cmd: node_modules/db-migrate/bin/db-migrate --config server/migrate-db-config.json --migrations-dir server/migrations up'

# this will look for the env var DATABASE_URL
# see: https://db-migrate.readthedocs.io/en/latest/Getting%20Started/configuration/
# and https://github.com/db-migrate/node-db-migrate/issues/349
node_modules/db-migrate/bin/db-migrate --config server/migrate-db-config.json --migrations-dir server/migrations up;

fi