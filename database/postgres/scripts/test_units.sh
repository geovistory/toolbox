#!/bin/bash

echo "*********************************"
echo run unit tests

pg_prove -U postgres -d $POSTGRES_DATABASE --ext .sql --recurse test/units/ 