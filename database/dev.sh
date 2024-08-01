#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# set the name of the docker compose project
export COMPOSE_PROJECT_NAME=dev

# Set the heavy Dockerfile (containing a filled database)
if [ "$DOCKER_PLATFORM" = "ARM" ]; then
    export DOCKER_FILE=heavy.arm.Dockerfile
else
    export DOCKER_FILE=dev.Dockerfile
fi

# Set the postgres port
export POSTGRES_PORT=$POSTGRES_PORT_DEV

# Shut down dev container
docker compose down -v

# Create dev container
docker compose up -d --wait --build

# Ensure filled_db is ready
docker exec $COMPOSE_PROJECT_NAME-postgres-1 sh -c 'until psql -U postgres -d filled_db -c "SELECT 1"; do echo "Waiting for PostgreSQL..."; sleep 0.5; done'

# Migrate databases based on test types
docker exec $COMPOSE_PROJECT_NAME-postgres-1 sh -c "scripts/migrate_up_filled_db.sh"
