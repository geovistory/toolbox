#!/bin/bash

echo '======================== Database migrations ======================'
echo 'Current environment: DB_ENV="'$DB_ENV'"'
echo ''

# if $DB_ENV = review and the recreation process is not skipped


if [ $DB_ENV = 'review' ]
then
  echo '================ Recreate database for review app ================'
  echo ''
  echo 'Name of the review app: '$HEROKU_APP_NAME

  # Get the database connection urls
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
  echo 'dumping staging and use it to restore review using this cmds:'
  echo 'pg_dump -Fc $GEOV_STAG_DATABASE_URL > dumpfile'
  pg_dump  -Fc $GEOV_STAG_DATABASE_URL > dumpfile;

  echo 'pg_restore --no-owner  --clean -d $DATABASE_URL dumpfile;'
  pg_restore --no-owner  --clean -d $DATABASE_URL dumpfile;

  echo 'rm -f dumpfile'
  rm -f dumpfile

  fi


  echo '================ End of heroku-prebuild.sh ================'
