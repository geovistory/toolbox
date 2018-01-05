#!/bin/sh

echo '===================== Run database migrations ==================='
echo 'DB_ENV="'$DB_ENV'"'
echo ''
node_modules/db-migrate/bin/db-migrate --config server/migrate-db-config.json --migrations-dir server/migrations up
echo ''
echo ''
echo '===================== Create angular sdk ========================'
echo ''
./node_modules/.bin/lb-sdk server/server client/src/app/shared/sdk -d ng2web -i enabled
echo ''
echo ''
echo '===================== Build angular app ========================='
cd ./client
npm install && ng build --prod
echo ''
echo ''


