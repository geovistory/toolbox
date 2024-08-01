#!/bin/bash
set -e

# Function to print the current timestamp and message
print_timestamp() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Define the database connection details
DB_URL="postgres://postgres:pw@localhost:5432/filled_db"


# Query to get pk_entity values
QUERY="SELECT pk_entity FROM projects.project;"

# Create initialization table if it doesn't exist
print_timestamp "Creating initialization table if it doesn't exist..."
psql $DB_URL <<EOF
CREATE TABLE IF NOT EXISTS pgwar.initialization (
    msg text,
    tmsp timestamp without time zone
);
EOF

# Function to run a query in the background
run_query() {
    local pk_entity="$1"
    local query="INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('start project entities for project $pk_entity', CLOCK_TIMESTAMP());
                 INSERT INTO pgwar.entity_preview(pk_entity, fk_project, fk_class, tmsp_fk_class_modification)
                 SELECT entity.pk_entity, ipr.fk_project, entity.fk_class, CURRENT_TIMESTAMP
                 FROM information.resource entity, projects.info_proj_rel ipr
                 WHERE ipr.fk_entity = entity.pk_entity
                 AND ipr.is_in_project IS TRUE
                 AND ipr.fk_project = $pk_entity;"
    echo "Running query for project: $pk_entity"
    psql $DB_URL -c "$query" &
}


# Execute the query and process each line returned
psql $DB_URL  --tuples-only -c "$QUERY" | while IFS= read -r pk_entity; do
    if [[ -n "$pk_entity" ]]; then     
      run_query "$pk_entity"
    fi
done

# Wait for all background jobs to complete
wait

echo "All queries have finished executing."