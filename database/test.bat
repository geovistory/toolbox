@echo off

:: Usage
:: To run unit tests: test.bat -u
:: To run integration tests: test.bat -i
:: To run performance tests: test.bat -p
:: To run any combination of tests, combine the flags. For example, to run both unit and integration tests: test.bat -u -i
:: To run all tests: test.bat -u -i -p

:: Parse flags
set "run_unit_tests=false"
set "run_integration_tests=false"
set "run_performance_tests=false"

:parse_args
if "%1"=="" goto end_parse_args
if "%1"=="-u" set "run_unit_tests=true"
if "%1"=="-i" set "run_integration_tests=true"
if "%1"=="-p" set "run_performance_tests=true"
shift
goto parse_args
:end_parse_args

:: Set the Dockerfile
if "%run_performance_tests%"=="true" (
    set "DOCKER_FILE=heavy.Dockerfile"
) else (
    set "DOCKER_FILE=light.Dockerfile"
)

:: Shut down test container
docker compose down -v

:: Create test container
docker compose up -d --wait --build

if "%run_unit_tests%"=="true" if "%run_integration_tests%"=="true" (
    :: Ensure schema_only_db is ready
    docker exec database-postgres-1 sh -c "until psql -U postgres -d schema_only_db -c 'SELECT 1'; do echo 'Waiting for PostgreSQL...'; sleep 0.5; done"
    :: Migrate databases based on test types
    docker exec database-postgres-1 sh -c "scripts/migrate_up_schema_only_db.sh"
)

if "%run_performance_tests%"=="true" (
    :: Ensure filled_db is ready
    docker exec database-postgres-1 sh -c "until psql -U postgres -d filled_db -c 'SELECT 1'; do echo 'Waiting for PostgreSQL...'; sleep 0.5; done"
    :: Migrate databases based on test types
    docker exec database-postgres-1 sh -c "scripts/migrate_up_filled_db.sh"
)

:: Initialize a flag to track if tests are successful
set "unit_tests_successful=true"
set "integration_tests_successful=true"
set "performance_tests_successful=true"

:: Run unit tests if specified
if "%run_unit_tests%"=="true" (
    set "unit_tests_successful=false"
    docker exec database-postgres-1 sh -c "scripts/test_units.sh"
    if %errorlevel%==0 (
        set "unit_tests_successful=true"
    )
)

:: Run integration tests if specified
if "%run_integration_tests%"=="true" (
    set "integration_tests_successful=false"
    docker exec database-postgres-1 sh -c "scripts/test_integration.sh"
    if %errorlevel%==0 (
        set "integration_tests_successful=true"
    )
)

:: Run performance tests if specified
if "%run_performance_tests%"=="true" (
    set "performance_tests_successful=false"
    docker exec database-postgres-1 sh -c "scripts/test_performance.sh"
    if %errorlevel%==0 (
        set "performance_tests_successful=true"
    )
)

:: Check the final status of all tests
if "%unit_tests_successful%"=="true" if "%integration_tests_successful%"=="true" if "%performance_tests_successful%"=="true" (
    echo *********************************
    echo All tests have been successful.
    echo *********************************
) else (
    echo *********************************
    echo Some tests failed!
    echo *********************************
    exit /b 1
)
