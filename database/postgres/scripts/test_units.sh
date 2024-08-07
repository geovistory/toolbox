#!/bin/bash

echo "*********************************"
echo run unit tests

pg_prove -U postgres -d $POSTGRES_SCHEMA_ONLY_DB --ext .sql --recurse test/units/ 