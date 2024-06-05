#!/bin/bash

# Usage
# To run unit tests: bash ./test.sh -u
# To run integration tests: bash ./test.sh -i
# To run performance tests: bash ./test.sh -p
# To run any combination of tests, combine the flags. For example, to run both unit and integration tests: bash ./test.sh -u -i
# To run all tests: bash ./test.sh -u -i -p

# Parse flags
run_unit_tests=false
run_integration_tests=false
run_performance_tests=false

while getopts "uip" flag; do
    case "${flag}" in
    u) run_unit_tests=true ;;
    i) run_integration_tests=true ;;
    p) run_performance_tests=true ;;
    *)
        echo "Usage: $0 [-u] [-i] [-p]"
        exit 1
        ;;
    esac
done

# Shut down test container
docker compose down -v

# Create test container
docker compose up -d --wait --build
echo "Test containers are up"
echo "Check if pg is ready..."

# Wait for PostgreSQL to be ready inside the container
docker exec database-postgres-1 sh -c 'until pg_isready -q; do echo "Waiting for PostgreSQL..."; sleep 0.5; done'

echo "Pg is ready. Starting tests."

# Migrate databases based on test types
if [ "$run_unit_tests" = true ] || [ "$run_integration_tests" = true ]; then
    docker exec database-postgres-1 sh -c "scripts/migrate_up_schema_only_db.sh"
fi

if [ "$run_performance_tests" = true ]; then
    docker exec database-postgres-1 sh -c "scripts/migrate_up_filled_db.sh"
fi

# Run unit tests if specified
if [ "$run_unit_tests" = true ]; then
    docker exec database-postgres-1 sh -c "scripts/test_units.sh"
fi

# Run integration tests if specified
if [ "$run_integration_tests" = true ]; then
    docker exec database-postgres-1 sh -c "scripts/test_integration.sh"
fi

# Run performance tests if specified
if [ "$run_performance_tests" = true ]; then
    docker exec database-postgres-1 sh -c "scripts/test_performance.sh"
fi
