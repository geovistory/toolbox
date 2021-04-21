if [ $DB_ENV='staging' ]; then
    # get day of week (1: Monday, 7: sunday)
    day=$(date +"%u")

    if [ $day='4' ]; then
        # maintenante mode on stagin ON
        heroku maintenance:on -a geovistory-staging

        # turn other workers OFF
        heroku ps:scale worker=0 -a geovistory-staging

        # copy production db to staging db
        heroku pg:copy geovistory-production::DATABASE_URL DATABASE_URL -a geovistory-staging

        # turn other workers ON
        heroku ps:scale worker=1 -a geovistory-staging

        # maintenante mode on stagin OFF
        heroku maintenance:off -a geovistory-staging
    fi
fi
