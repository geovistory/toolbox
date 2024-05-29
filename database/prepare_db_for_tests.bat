@echo off

:: Drop the test database
docker exec -it database-postgres-1 sh -c "scripts/drop_test_db.sh"

:: Create the test database
docker exec -it database-postgres-1 sh -c "scripts/create_test_db.sh"

:: Migrate up
docker exec -it database-postgres-1 sh -c "scripts/migrate_up.sh"
