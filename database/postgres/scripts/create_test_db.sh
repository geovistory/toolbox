#!/bin/bash

echo "*********************************"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE $POSTGRES_DATABASE;
EOSQL