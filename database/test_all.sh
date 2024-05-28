#!/bin/bash

bash prepare_db_for_tests.sh

# run unit tests
docker exec -it poc-war-entity-label-postgres-1 sh -c  "scripts/test_units.sh"
# run integration tests
docker exec -it poc-war-entity-label-postgres-1 sh -c  "scripts/test_integration.sh"

# run performance tests
bash prepare_db_for_performance_tests.sh
docker exec -it poc-war-entity-label-postgres-1 sh -c  "scripts/test_performance.sh"
