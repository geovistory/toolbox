@echo off

:: Run the preparation script
call prepare_db_for_tests.bat

:: Run integration tests
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts/test_integration.sh"
