#!/bin/bash

# drop test db
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts/drop_test_db.sh"

# create test db
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts/create_test_db.sh"

# migrate up
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts/migrate_up.sh"

# seed db
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts/seed_data.sh"
