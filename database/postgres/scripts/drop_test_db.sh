#!/bin/bash

echo "*********************************"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    DROP DATABASE $POSTGRES_DATABASE WITH (FORCE);
EOSQL