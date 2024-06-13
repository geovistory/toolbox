#!/bin/bash

echo "*********************************"
echo test integration

pg_prove -U postgres -d $POSTGRES_SCHEMA_ONLY_DB --ext .sql --recurse test/integration/