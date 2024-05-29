#!/bin/bash

bash prepare_db_for_performance_tests.sh

# run performance tests
docker exec -it database-postgres-1 sh -c "scripts/test_performance.sh"
