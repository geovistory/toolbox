#!/bin/bash
set -e # exit on error (e.g. when migrations fail)

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

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# set the name of the docker compose project
export COMPOSE_PROJECT_NAME=test

# Set the postgres port
export POSTGRES_PORT=$POSTGRES_PORT_TEST

# Set the Dockerfile
if [ "$run_performance_tests" = true ]; then
    # the filled one for performance tests
    if [ $DOCKER_PLATFORM = "ARM" ]; then
        # the one for arm
        export DOCKER_FILE=heavy.arm.Dockerfile
    else
        # the amd (default)
        export DOCKER_FILE=heavy.Dockerfile
    fi
else
    # the empty one for unit and integration tests
    if [ $DOCKER_PLATFORM = "ARM" ]; then
        # the one for arm
        export DOCKER_FILE=light.arm.Dockerfile
    else
        # the amd (default)
        export DOCKER_FILE=light.Dockerfile
    fi
fi

# Shut down test container
docker compose down -v

# Create test container
docker compose up -d --wait --build

if [ "$run_unit_tests" = true ] || [ "$run_integration_tests" = true ]; then
    # Ensure schema_only_db is ready
    docker exec $COMPOSE_PROJECT_NAME-postgres-1 sh -c 'until psql -U postgres -d schema_only_db -c "SELECT 1"; do echo "Waiting for PostgreSQL..."; sleep 0.5; done'
    # Migrate databases based on test types
    docker exec $COMPOSE_PROJECT_NAME-postgres-1 sh -c "scripts/migrate_up_schema_only_db.sh"
fi

if [ "$run_performance_tests" = true ]; then
    # Ensure filled_db is ready
    docker exec $COMPOSE_PROJECT_NAME-postgres-1 sh -c 'until psql -U postgres -d filled_db -c "SELECT 1"; do echo "Waiting for PostgreSQL..."; sleep 0.5; done'
    # Migrate databases based on test types
    docker exec $COMPOSE_PROJECT_NAME-postgres-1 sh -c "scripts/migrate_up_filled_db.sh"
fi

# Initialize a flag to track if tests are successful
unit_tests_successful=true
integration_tests_successful=true
performance_tests_successful=true

# Run unit tests if specified
if [ "$run_unit_tests" = true ]; then
    unit_tests_successful=false
    docker exec $COMPOSE_PROJECT_NAME-postgres-1 sh -c "scripts/test_units.sh"
    if [ $? -eq 0 ]; then
        unit_tests_successful=true
    fi
fi

# Run integration tests if specified
if [ "$run_integration_tests" = true ]; then
    integration_tests_successful=false
    docker exec $COMPOSE_PROJECT_NAME-postgres-1 sh -c "scripts/test_integration.sh"
    if [ $? -eq 0 ]; then
        integration_tests_successful=true
    fi
fi

# Run performance tests if specified
if [ "$run_performance_tests" = true ]; then
    performance_tests_successful=false
    docker exec $COMPOSE_PROJECT_NAME-postgres-1 sh -c "scripts/test_performance.sh"
    if [ $? -eq 0 ]; then
        performance_tests_successful=true
    fi
fi

# Check the final status of all tests
if [ "$unit_tests_successful" = true ] && [ "$integration_tests_successful" = true ] && [ "$performance_tests_successful" = true ]; then
    echo "*********************************"
    echo "All tests have been successful."
    echo "*********************************"
else
    echo "*********************************"
    echo "Some tests failed!"
    echo "*********************************"
    # Exit with error, in order to stop GitHub action
    exit 1
fi
