#!/bin/bash
if [ $DB_ENV = 'review' ]
then

    echo '========================================================================= ';
    echo '============================= SETUP REVIEW DB =========================== ';

    DB_SOURCE=$GEOV_STAG_DATABASE_URL;
    DB_TARGET=$DATABASE_URL;

    echo 'copy data'
    echo 'from: '$DB_SOURCE;
    echo 'copy to: '$DB_TARGET;
    dirPath=`pwd`;
    echo 'dump to: '$dirPath



    echo '============================= DUMP STAGING DB ============================ ';
    node dump-staging.js $DB_SOURCE $dirPath;


    # echo '================= DROP ALL SCHEMAS OF REVIEW DB ==========================';
    # psql $DB_TARGET -f dropSchemas.sql


    echo '================= MIGRATE REVIEW DB UP TO STATE OF STAGING ===============';
    latest_migration=`psql $DB_SOURCE -t -c "SELECT trim(leading '/' from name) from public.migrations ORDER BY id DESC LIMIT 1"`
    echo 'latest migration of staging: '$latest_migration;
    ../node_modules/db-migrate/bin/db-migrate --config ../server/migrate-db-config.json --migrations-dir ../server/migrations up $latest_migration;



    echo '================= RESTORE REVIEW DB WITH DATA OF STAGING ================= ';
    node restore-review.js $DB_TARGET $dirPath;


    echo '================== FIX SEQUENCES OF REVIEW DB ============================ ';

    psql $DB_TARGET -Atq -f reset-sequences.sql -o temp;
    psql $DB_TARGET -f temp;
    rm temp;

    echo '================================= VACUUM ANALYZE ========================= ';
    psql $DB_SOURCE -c "VACUUM ANALYZE";

    echo '============================= DELETE DUMP ================================ ';

    rm -r $dirPath/data_dump;

    echo '======== REVIEW DB IS READY FOR MIGRATING UP IN RELEASE PHASE ============ ';
    echo '========================================================================= ';
fi