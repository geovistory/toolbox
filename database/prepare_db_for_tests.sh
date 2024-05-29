#!/bin/bash

# drop test db
docker exec -it database-postgres-1 sh -c "scripts/drop_test_db.sh"

# create test db
docker exec -it database-postgres-1 sh -c "scripts/create_test_db.sh"

# migrate up
docker exec -it database-postgres-1 sh -c "scripts/migrate_up.sh"
