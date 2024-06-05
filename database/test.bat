@echo off
setlocal

:: Usage
:: To run unit tests: bash ./test.sh -u
:: To run integration tests: bash ./test.sh -i
:: To run performance tests: bash ./test.sh -p
:: To run any combination of tests, combine the flags. For example, to run both unit and integration tests: bash ./test.sh -u -i
:: To run all tests: bash ./test.sh -u -i -p

:: Parse flags
set run_unit_tests=false
set run_integration_tests=false
set run_performance_tests=false

:parse_args
if "%1"=="" goto end_parse
if "%1"=="-u" set run_unit_tests=true
if "%1"=="-i" set run_integration_tests=true
if "%1"=="-p" set run_performance_tests=true
shift
goto parse_args

:end_parse

:: Shut down test container
docker compose down -v

:: Create test container
docker compose up -d --wait --build

:: Wait for PostgreSQL to be ready inside the container
docker exec database-postgres-1 sh -c 'until psql -U postgres -c "select 1"; do echo "Waiting for PostgreSQL..."; sleep 1; done'

:: Migrate databases based on test types
if "%run_unit_tests%"=="true" (
    docker exec database-postgres-1 sh -c "scripts/migrate_up_schema_only_db.sh"
)
if "%run_integration_tests%"=="true" (
    docker exec database-postgres-1 sh -c "scripts/migrate_up_schema_only_db.sh"
)
if "%run_performance_tests%"=="true" (
    docker exec database-postgres-1 sh -c "scripts/migrate_up_filled_db.sh"
)

:: Run unit tests if specified
if "%run_unit_tests%"=="true" (
    docker exec database-postgres-1 sh -c "scripts/test_units.sh"
)

:: Run integration tests if specified
if "%run_integration_tests%"=="true" (
    docker exec database-postgres-1 sh -c "scripts/test_integration.sh"
)

:: Run performance tests if specified
if "%run_performance_tests%"=="true" (
    docker exec database-postgres-1 sh -c "scripts/test_performance.sh"
)

endlocal