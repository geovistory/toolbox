#!/bin/bash

echo '======================== Database migrations ======================'
echo 'Current environment: DB_ENV="'$DB_ENV'"'
echo ''

# if $DB_ENV = review and the recreation process is not skipped

# set skipDump to true if you want to skip the recreation process
skipDump=false
echo 'skipDump is: '$skipDump

if [ $DB_ENV = 'review' -a $skipDump = false ]
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
  echo 'reset the database called '$DATABASE_URL' of app '$HEROKU_APP_NAME' (if exists)'
  echo ''

  heroku pg:reset --app $HEROKU_APP_NAME --confirm

  # delete (if exists) the database called like $DATABASE_URL
  # (e.g. 'de8ucdfdgv0slb')


echo ''
echo '             ================ Step 3 ================'
echo 'dumping staging and use it to restore review over the pipe using this cmd:'
echo 'pg_dump -h host1 dbname | psql -h host2 dbname'

pg_dump $staging_db_url | psql $review_db_url -v ON_ERROR_STOP=on

if [ $? -eq 0 ]; then
  echo Success! The review database is restored from staging
else
  echo SQL command failed
  exit 1
fi

fi


echo '======================== Run db-migrate-up ======================'
echo 'db-migrate will use this db-connection: '$DATABASE_URL

# this will look for the env var DATABASE_URL
# see: https://db-migrate.readthedocs.io/en/latest/Getting%20Started/configuration/
node_modules/db-migrate/bin/db-migrate --migrations-dir server/migrations up

echo ''
echo ''
echo '===================== Create angular sdk ========================'
echo ''
./node_modules/.bin/lb-sdk server/server client/src/app/core/sdk -d ng2web -i enabled
echo ''
echo ''
echo '===================== Build angular app ========================='
cd ./client
npm install && ng build --prod
echo ''
echo ''




