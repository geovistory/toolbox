#!/bin/bash

echo '======================== Database Restore Script ======================'
echo 'Current environment: DB_ENV="'$DB_ENV'"'
echo ''

if [ $DB_ENV = 'review' ]
then
    time pg_restore --no-owner -d $DATABASE_URL deployment/reviewdb.tar
fi

echo '================ End of heroku-postbuild.sh ================'