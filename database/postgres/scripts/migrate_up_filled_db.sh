#!/bin/bash

echo "*********************************"
echo run migrations against: $POSTGRES_FILLED_DB

export DATABASE_URL=postgres://postgres:pw@localhost:5432/$POSTGRES_FILLED_DB

. "$NVM_DIR/nvm.sh" && db-migrate up
