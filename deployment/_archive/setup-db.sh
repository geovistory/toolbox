#!/bin/bash

# Assign source and target database urls
if [ $DB_ENV = 'review' ]; then
  DB_SOURCE=$GEOV_STAG_DATABASE_URL
  DB_TARGET=$DATABASE_URL
fi

if [ $DB_ENV = 'staging' ]; then
  DB_SOURCE=$GEOV_PROD_DATABASE_URL
  DB_TARGET=$DATABASE_URL
fi

if [ $DB_ENV = 'development' ]; then
  DB_SOURCE=$GEOV_PROD_DATABASE_URL
  DB_TARGET=$DATABASE_URL
fi

# Begin the process of data replication, if in review or staging environment
# if [ $DB_ENV = 'review' ] || [ $DB_ENV = 'staging' ] || [ $DB_ENV = 'development' ]; then
if [ $DB_ENV = 'review' ] || [ $DB_ENV = 'development' ]; then

  echo '========================================================================= '
  echo '============================= SETUP TARGET DB =========================== '

  echo 'copy data'
  echo 'from SOURCE: '$DB_SOURCE
  echo 'to TARGET: '$DB_TARGET
  tmpPath=$(pwd)/tmp
  echo 'dump to: '$tmpPath

  latest_migration_of_source=$(psql $DB_SOURCE -t -c "SELECT trim(leading '/' from name) from public.migrations ORDER BY id DESC LIMIT 1")
  latest_migration_of_target=$(psql $DB_TARGET -t -c "SELECT trim(leading '/' from name) from public.migrations ORDER BY id DESC LIMIT 1")
  echo 'latest migration of source: '$latest_migration_of_source
  echo 'latest migration of target: '$latest_migration_of_target

  if [ $latest_migration_of_source = $latest_migration_of_target ]; then
    echo '=========================== SKIPPING DATA COPY PROCESS ================== '
    echo 'Latest migrations of source and target db have the same name.'
    echo '========================================================================= '

  else

    echo '=========================== STARTING DATA COPY PROCESS ================== '
    echo 'Target db is not at the same level of migrations.'
    echo '========================================================================= '

    echo '============================= DUMP SOURCE DB ============================ '
    node dump-source.js $DB_SOURCE $tmpPath

    echo '================= DROP ALL SCHEMAS OF TARGET DB =========================='
    psql $DB_TARGET -f dropSchemas.sql

    echo '================= MIGRATE TARGET DB UP TO STATE OF SOURCE ==============='
    ../node_modules/db-migrate/bin/db-migrate --config ../server/migrate-db-config.json --migrations-dir ../server/migrations up $latest_migration_of_source

    echo '=========== CREATE SCRIPTS TO DROP AND RECREATE ALL CONSTRAINTS ======== '
    node create-dropping-constraints-sqls.js $DB_TARGET $tmpPath
    node create-adding-constraints-sqls.js $DB_TARGET $tmpPath

    echo '========================= DROP ALL CONSTRAINTS  ========================= '
    psql $DB_TARGET -f $tmpPath/droppingConstraints.sql
    echo '================= RESTORE TARGET DB WITH DATA OF SOURCE ================= '
    node restore-target.js $DB_TARGET $tmpPath
    echo '========================= ADD ALL CONSTRAINTS =========================== '
    psql $DB_TARGET -f $tmpPath/addingConstraints.sql

    echo '================== FIX SEQUENCES OF TARGET DB ============================ '

    psql $DB_TARGET -Atq -f reset-sequences.sql -o $tmpPath/sequences
    psql $DB_TARGET -f $tmpPath/sequences

    echo '================================= VACUUM ANALYZE ========================= '
    psql $DB_SOURCE -c "VACUUM ANALYZE"

    # echo '=========================== DELETE TMP FILES ============================= '
    # rm -r $tmpPath

    echo '======== TARGET DB IS READY FOR MIGRATING UP IN RELEASE PHASE ============ '
    echo '========================================================================== '
  fi
fi