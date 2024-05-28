@echo off

:: Drop the test database
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts/drop_test_db.sh"

:: Create the test database
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts/create_test_db.sh"

:: Migrate up
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts/migrate_up.sh"
