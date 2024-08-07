#!/bin/bash

echo "*********************************"
echo test performance

pg_prove -U postgres -d $POSTGRES_FILLED_DB --ext .sql --recurse test/performance/