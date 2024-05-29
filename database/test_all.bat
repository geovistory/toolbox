@echo off

:: Run the preparation script
call prepare_db_for_tests.bat

:: Run unit tests
docker exec -it database-postgres-1 sh -c "scripts/test_units.sh"

:: Run integration tests
docker exec -it database-postgres-1 sh -c "scripts/test_integration.sh"

:: Run performance tests
call prepare_db_for_performance_tests.bat
docker exec -it database-postgres-1 sh -c "scripts/test_performance.sh"
