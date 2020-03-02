#!/bin/bash

echo '================ Start of heroku-postbuild.sh =============================='
echo 'Current environment: DB_ENV="'$DB_ENV'"'
echo ''

if [ $DB_ENV = 'review' ]; then

  echo '======== Restore Database (from deployment/reviewdb.tar) ================='
  time pg_restore --no-owner -d $DATABASE_URL deployment/reviewdb.tar --clean --verbose
  echo '======== Database restored  =============================================='
  echo

  echo '======== Recreate Warehouse (entity_previews) ============================'
  time psql -d $DATABASE_URL -c 'SELECT war.warehouse_update_all()'
  echo '======== Recreate Warehouse done! ========================================'

fi

echo '================ End of heroku-postbuild.sh ================================'
