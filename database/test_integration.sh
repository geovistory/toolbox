#!/bin/bash

bash prepare_db_for_tests.sh

# run integration tests
docker exec -it poc-war-entity-label-postgres-1 sh -c  "scripts/test_integration.sh"
