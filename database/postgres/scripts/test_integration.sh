#!/bin/bash

echo "*********************************"
echo test integration

pg_prove -U postgres -d $POSTGRES_DATABASE --ext .sql --recurse test/integration/