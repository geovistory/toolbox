#!/bin/bash

echo '================ Start of heroku-postbuild.sh =============================='
echo 'Current environment: DB_ENV="'$DB_ENV'"'
echo ''

if [ $DB_ENV = 'review' ] && [ $RESTORE_DB = 'ON' ]; then

  echo '================= Drop schemas of target DB =============================='
  # We need to drop schemas before restoring because the review database may be
  # in an earlier state, created by deployment after previeous commit on the
  # same pull request
  time psql $DATABASE_URL -f deployment/drop-schemas.sql
  echo '================= Drop schemas done! ====================================='
  echo

  echo '======== Restore Database (from deployment/reviewdb.backup) =============='
  echo 'using this command:'
  echo 'time pg_restore -j 6 --no-owner -d $DATABASE_URL deployment/reviewdb.backup --verbose'
  echo
  time pg_restore -j 6 --no-owner -d $DATABASE_URL deployment/reviewdb.backup --verbose
  echo '======== Database restored  =============================================='
  echo

  echo '======== Recreate Warehouse (entity_previews) ============================'
  time psql -d $DATABASE_URL -c 'SELECT war.warehouse_update_all()'
  echo '======== Recreate Warehouse done! ========================================'

fi

echo '================ End of heroku-postbuild.sh ================================'
