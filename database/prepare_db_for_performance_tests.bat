@echo off

:: Drop test db
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts\drop_test_db.sh"

:: Create test db
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts\create_test_db.sh"

:: Migrate up
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts\migrate_up.sh"

:: Seed db
docker exec -it poc-war-entity-label-postgres-1 sh -c "scripts\seed_data.sh"