#!/bin/bash

echo "*********************************"
echo test performance

pg_prove -U postgres -d $POSTGRES_DATABASE --ext .sql --recurse test/performance/