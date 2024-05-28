@echo off

:: Run the preparation script
call prepare_db_for_performance_tests.bat

:: Run performance tests
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts/test_performance.sh"
