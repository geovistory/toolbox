#!/bin/bash

if [ $DB_ENV = 'review' ] || [ $DB_ENV = 'staging' ] || [ $DB_ENV = 'development' ]
then
  echo 'no postbuld / no: cd deployment && bash setup-db.sh '   # cd deployment && bash setup-db.sh
fi



echo '======================== Database Copy Script ======================'
echo 'Current environment: DB_ENV="'$DB_ENV'"'
echo 'Restore db: $RESTORE_DB="'$RESTORE_DB'" (expected values: "on", "off")'
echo ''

# if $DB_ENV = review and the recreation process is not skipped


if [ $DB_ENV = 'review' ] && [ $RESTORE_DB = 'on' ]
then
  echo '================ Recreate database for review app ================'
  echo ''
  echo 'Name of the review app: '$HEROKU_APP_NAME
  echo ''
  echo '             ================ Step 1 ================'
  echo 'Create the database connection urls'
  echo ''

  staging_db_url=$GEOV_STAG_DATABASE_URL;
  review_db_url=$DATABASE_URL;

  echo 'staging_db_url='$staging_db_url
  echo 'review_db_url='$review_db_url
  echo ''
  echo '             ================ Step 2 ================'
  echo 'Drop all schemas of review database'
  echo ''
  psql $review_db_url -f deployment/dropSchemas.sql
  echo ''
  echo '             ================ Step 3 ================'
  echo 'dumping staging and use it to restore review using this cmds:'
  echo 'time pg_dump -Fc $GEOV_STAG_DATABASE_URL > dumpfile'
  time pg_dump  -Fc $GEOV_STAG_DATABASE_URL > dumpfile;

  echo 'time pg_restore -j 6 --no-owner -d $DATABASE_URL dumpfile;'
  time pg_restore -j 6 --no-owner -d $DATABASE_URL dumpfile;

  echo 'rm -f dumpfile'
  rm -f dumpfile

  fi


  echo '================ End of heroku-prebuild.sh ================'
