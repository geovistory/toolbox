#!/bin/bash

echo '======================== Database migrations ======================'
echo 'Current environment: DB_ENV="'$DB_ENV'"'
echo ''


# export GEOV_REV_DATABASE_URL='postgres://postgres:Guru@Marly@165.227.150.159:5432/geovistory_review?ssl=true' && export HEROKU_APP_NAME='geovistory-staging-pr-25' && export DB_ENV='review' && export DB_USER='postgres' && export DB_PASSWORD="Guru@Marly" && export DB_HOST='165.227.150.159' && export DB_PORT='5432' && sh postinstall.sh


# if $DB_ENV = review

if [ $DB_ENV = 'review' ]
then
  echo '================ Recreate database for review app ================'
  echo ''
  echo 'Name of the review app: '$HEROKU_APP_NAME
  echo ''

  # Get the database connection urls
  echo '             ================ Step 1 ================'
  echo 'Create the database connection urls'
  echo ''

  function rawurlencode {
    local string="${1}"
    local strlen=${#string}
    local encoded=""
    local pos c o

    for (( pos=0 ; pos<strlen ; pos++ )); do
      c=${string:${pos}:1}
      case "$c" in
        [-_.~a-zA-Z0-9] ) o="${c}" ;;
        * )               printf -v o '%%%02x' "'$c"
      esac
      encoded+="${o}"
    done
    echo "${encoded}"
  }

  function getparam {
    USER_ENV=`node -p "require('./server/migrate-db-config.json').$DB_ENV.${1}.ENV"`;
    rawString=$(printf '%s\n' "${!USER_ENV}")
    echo $(rawurlencode $rawString)
  }

  user=$(getparam user)
  password=$(getparam password)
  host=$(getparam host)
  port=$(getparam port)
  database=$(getparam database)
  ssl=$(getparam ssl)

  maintenance_db_url='postgres://'$user':'$password'@'$host':'$port'/postgres?ssl='$ssl
  staging_db_url='postgres://'$user':'$password'@'$host':'$port'/geovistory_staging?ssl='$ssl
  review_db_url='postgres://'$user':'$password'@'$host':'$port'/'$database'?ssl='$ssl

  echo 'maintenance_db_url='$maintenance_db_url
  echo 'staging_db_url='$staging_db_url
  echo 'review_db_url='$review_db_url


  echo '             ================ Step 2 ================'
  echo 'delete the database called '$HEROKU_APP_NAME' (if exists)'
  echo ''

  # delete (if exists) the database called like $HEROKU_APP_NAME
  # (e.g. 'geovistory_staging_pr_25')

  psql $maintenance_db_url -v ON_ERROR_STOP=ON << EOF
  -- kill sessions to the database

  SELECT pg_terminate_backend(pg_stat_activity.pid)
  FROM pg_stat_activity
  WHERE pg_stat_activity.datname = '$database'
  AND pid <> pg_backend_pid();

  -- drop the database

  DROP DATABASE
  IF EXISTS "$database";
EOF

if [ $? -eq 0 ]; then
    echo Success
else
    echo SQL command failed
    exit 1
fi


echo '             ================ Step 2 ================'
echo 'creating an empty database called: '$HEROKU_APP_NAME
echo ''

psql $maintenance_db_url -v ON_ERROR_STOP=1 -x << EOF
-- create an empty database called like the app
CREATE DATABASE "$database";
EOF
if [ $? -eq 0 ]; then
  echo Success
else
  echo SQL command failed
  exit 1
fi

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




