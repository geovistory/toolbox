#!/bin/sh

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

  # Get the database connection url

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


echo '             ================ Step 1 ================'
echo 'delete the database called '$HEROKU_APP_NAME' (if exists)'
echo ''

# delete (if exists) the database called like $HEROKU_APP_NAME
# (e.g. 'geovistory_staging_pr_25')

maintenance_DB_url='postgres://'$user':'$password'@'$host':'$port'/postgres?ssl='$ssl

psql $maintenance_DB_url -v ON_ERROR_STOP=ON << EOF
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
echo 'make a copy of the database geovistory_staging called '$HEROKU_APP_NAME
echo ''

# make a copy of the database 'geovistory_staging' named like $HEROKU_APP_NAME

psql $maintenance_DB_url -v ON_ERROR_STOP=1 -x << EOF
-- create a clone of the staging database

CREATE DATABASE "$database"
WITH TEMPLATE 'geovistory_staging';
EOF
if [ $? -eq 0 ]; then
    echo Success
else
    echo SQL command failed
    exit 1
fi

echo '             ================ Step 3 ================'
echo 'Set the right database connection url for the app '$HEROKU_APP_NAME
echo 'Exporting GEOV_REV_DATABASE_URL...'

# Set the right database connection url for the app pointing to $HEROKU_APP_NAME

export GEOV_REV_DATABASE_URL='postgres://'$user':'$password'@'$host':'$port'/'$database'?ssl='$ssl
echo 'GEOV_REV_DATABASE_URL='$GEOV_REV_DATABASE_URL

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




