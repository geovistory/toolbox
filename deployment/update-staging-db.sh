# command to execute on heroku scheduler:
# bash deployment/update-staging-db.sh

if [[ "$DB_ENV" == "staging" ]]; then
    # get day of week (1: Monday, ..., 7: sunday)
    day=$(date +"%u")

    if [[ "$day" == "5" ]]; then # on fridays

        # maintenante mode on stagin ON
        heroku maintenance:on -a geovistory-staging

        # turn other workers OFF
        heroku ps:scale worker=0 -a geovistory-staging

        # clean the warehouse: drop the schema: warcache_githash || drop all schema starting with warcache_ -c
        name=$(heroku pg:psql -a geovistory-staging -c "SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'war_cache_%'" WH_DATABASE_URL)
        name=${name/schema_name/''} # remove the string 'schema_name'
        name=${name//-/''} # remove the dashs 
        name=${name/(1 ligne)/''} # remove the string '(1 ligne)', if FR env
        name=${name/(1 row)/''} # remove the string '(1 row)', if EN env
        name=`echo $name | xargs`
        heroku pg:psql -a geovistory-staging -c "DROP SCHEMA IF EXISTS ${name} CASCADE;" WH_DATABASE_URL

        # copy production db to staging db
        heroku pg:copy geovistory-production::DATABASE_URL DATABASE_URL -a geovistory-staging --confirm=geovistory-staging

        # turn other workers ON
        heroku ps:scale worker=1 -a geovistory-staging

        # maintenante mode on stagin OFF
        heroku maintenance:off -a geovistory-staging
    fi
fi