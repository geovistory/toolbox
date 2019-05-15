#!/bin/bash

# Assign source and target database urls
if [ $DB_ENV = 'review' ]
then
    DB_SOURCE=$GEOV_STAG_DATABASE_URL;
    DB_TARGET=$DATABASE_URL;
fi

if [ $DB_ENV = 'staging' ]
then
    DB_SOURCE=$GEOV_PROD_DATABASE_URL;
    DB_TARGET=$DATABASE_URL;
fi

# Begin the process of data replication, if in review or staging environment
if [ $DB_ENV = 'review' ] || [ $DB_ENV = 'staging' ]
then

    echo '========================================================================= ';
    echo '============================= SETUP TARGET DB =========================== ';


    echo 'copy data'
    echo 'from: '$DB_SOURCE;
    echo 'copy to: '$DB_TARGET;
    dirPath=`pwd`;
    echo 'dump to: '$dirPath



    echo '============================= DUMP SOURCE DB ============================ ';
    node dump-source.js $DB_SOURCE $dirPath;


    # echo '================= DROP ALL SCHEMAS OF TARGET DB ==========================';
    # psql $DB_TARGET -f dropSchemas.sql


    echo '================= MIGRATE TARGET DB UP TO STATE OF SOURCE ===============';
    latest_migration=`psql $DB_SOURCE -t -c "SELECT trim(leading '/' from name) from public.migrations ORDER BY id DESC LIMIT 1"`
    echo 'latest migration of staging: '$latest_migration;
    ../node_modules/db-migrate/bin/db-migrate --config ../server/migrate-db-config.json --migrations-dir ../server/migrations up $latest_migration;



    echo '================= RESTORE TARGET DB WITH DATA OF SOURCE ================= ';
    node restore-target.js $DB_TARGET $dirPath;


    echo '================== FIX SEQUENCES OF TARGET DB ============================ ';

    psql $DB_TARGET -Atq -f reset-sequences.sql -o temp;
    psql $DB_TARGET -f temp;
    rm temp;

    echo '================================= VACUUM ANALYZE ========================= ';
    psql $DB_SOURCE -c "VACUUM ANALYZE";

    echo '============================= DELETE DUMP ================================ ';

    rm -r $dirPath/data_dump;

    echo '======== TARGET DB IS READY FOR MIGRATING UP IN RELEASE PHASE ============ ';
    echo '========================================================================== ';
fi