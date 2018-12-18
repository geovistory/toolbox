#!/bin/bash
echo '========================================================================= ';
echo '============================= SETUP REVIEW DB =========================== ';

DB_SOURCE='postgres://qephbxmaqlbbsi:f443e911ee88f21491add8d4ae9ddca4c71e5f81d67e47685bae2d152bf8c6a9@ec2-54-228-251-254.eu-west-1.compute.amazonaws.com:5432/de8ucdfdgv0slb';
DB_TARGET=$DATABASE_URL;

echo 'copy data'
echo 'from: '$DB_SOURCE;
echo 'copy to: '$DB_TARGET;
dirPath=`pwd`;
echo 'dump to: '$dirPath



echo '============================= DUMP STAGING DB ============================ ';
node dump-staging.js $DB_SOURCE $dirPath;


echo '================= MIGRATE REVIEW DB UP TO STATE OF STAGING ===============';
latest_migration=`psql $DB_SOURCE -t -c "SELECT name from public.migrations ORDER BY id DESC LIMIT 1"`
echo 'latest migration of staging: '$latest_migration;
../node_modules/db-migrate/bin/db-migrate --config ../server/migrate-db-config.json --migrations-dir ../server/migrations up latest_migration;



echo '================= RESTORE REVIEW DB WITH DATA OF STAGING ================= ';
node restore-review.js $DB_TARGET $dirPath;


echo '================== FIX SEQUENCES OF REVIEW DB ============================ ';

psql $DB_TARGET -Atq -f reset-sequences.sql -o temp;
psql $DB_TARGET -f temp;
rm temp;




echo '================== MIGRATE REVIEW DB UP TO LATEST STATE ================== ';

../node_modules/db-migrate/bin/db-migrate --config ../server/migrate-db-config.json --migrations-dir ../server/migrations up;


echo '================================= VACUUM ANALYZE ========================= ';
psql $DB_SOURCE -c "VACUUM ANALYZE";

echo '============================= DELETE DUMP ================================ ';

rm -r $dirPath/data_dump;

echo '============================= REVIEW DB IS READY ======================== ';
echo '========================================================================= ';
