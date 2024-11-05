#!/bin/bash
set -e

# Define the database connection details
DB_URL="postgres://postgres:postgres@localhost:5432/toolbox_staging"

#Set the number of concurrent tasks for the parallelization
CONCURRENT_TASKS=24


# Function to print the current timestamp and message
print_timestamp() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$0")

# Create initialization table if it doesn't exist
print_timestamp "Creating initialization table if it doesn't exist..."
psql $DB_URL <<EOF
CREATE TABLE IF NOT EXISTS pgwar.initialization (
    msg text,
    tmsp timestamp without time zone
);
EOF

# Reset pg_stat_statements
print_timestamp "Resetting pg_stat_statements..."
psql $DB_URL <<EOF
SELECT pg_stat_statements_reset();
EOF

# Truncate pgwar.entity_preview
print_timestamp "Truncating pgwar.entity_preview..."
psql $DB_URL <<EOF
TRUNCATE pgwar.entity_preview;
EOF

# Truncate pgwar.project_statements
print_timestamp "Truncating pgwar.project_statements..."
psql $DB_URL <<EOF
TRUNCATE pgwar.project_statements;
EOF

# Truncate pgwar.initialization
print_timestamp "Truncating pgwar.initialization..."
psql $DB_URL <<EOF
TRUNCATE pgwar.initialization;
EOF

# Start project statements
print_timestamp "Starting project statements..."
psql $DB_URL <<EOF
    INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('start statements', CLOCK_TIMESTAMP());
    SELECT pgwar.update_from_statement(item)
    FROM (SELECT i.* FROM information.statement i) AS item;
EOF

# Start community entities
print_timestamp "Starting community entities..."
psql $DB_URL <<EOF
    INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('start community entities', CLOCK_TIMESTAMP());
    INSERT INTO pgwar.entity_preview(pk_entity, fk_project, fk_class, tmsp_fk_class_modification)
    SELECT DISTINCT ON (newtab.pk_entity) newtab.pk_entity, 0, newtab.fk_class, CURRENT_TIMESTAMP
    FROM information.resource newtab, projects.info_proj_rel ipr
    WHERE ipr.fk_entity = newtab.pk_entity AND ipr.is_in_project IS TRUE;
EOF

# Start VACUUM ANALYZE
print_timestamp "Starting VACUUM ANALYZE..."
psql $DB_URL <<EOF
    INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('VACUUM ANALYZE', CLOCK_TIMESTAMP());
    VACUUM ANALYZE;
EOF

# Start project entities
psql $DB_URL <<EOF
    INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('start project entities', CLOCK_TIMESTAMP());
EOF
bash $SCRIPT_DIR/pgwar-init-project-entities/create-tables.sh $CONCURRENT_TASKS $DB_URL;
bash $SCRIPT_DIR/pgwar-init-project-entities/loop-over-tables.sh $CONCURRENT_TASKS $DB_URL;

# Start VACUUM ANALYZE
print_timestamp "Starting VACUUM ANALYZE..."
psql $DB_URL <<EOF
    INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('VACUUM ANALYZE', CLOCK_TIMESTAMP());
    VACUUM ANALYZE;
EOF

# Start community statements
print_timestamp "Starting community statements..."
psql $DB_URL <<EOF
    INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('start community statements', CLOCK_TIMESTAMP());
    SELECT pgwar.update_community_statements_from_upserts();
EOF

# Start VACUUM ANALYZE
print_timestamp "Starting VACUUM ANALYZE..."
psql $DB_URL <<EOF
    INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('VACUUM ANALYZE', CLOCK_TIMESTAMP());
    VACUUM ANALYZE;
EOF

# Start full texts
print_timestamp "Starting full texts..."
psql $DB_URL <<EOF
    INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('start fulltexts', CLOCK_TIMESTAMP());
    SELECT pgwar.update_full_texts(100000000);
EOF

# Start entity class metadata
print_timestamp "Starting entity class metadata..."
psql $DB_URL <<EOF
    INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('start entity class', CLOCK_TIMESTAMP());
    SELECT pgwar.update_entity_class();
EOF

# Start entity fk_type
print_timestamp "Starting entity fk_type..."
psql $DB_URL <<EOF
    INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('start fk_type', CLOCK_TIMESTAMP());
    SELECT pgwar.update_fk_type();
EOF

# Start entity type label
print_timestamp "Starting entity type label..."
psql $DB_URL <<EOF
    INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('start type label', CLOCK_TIMESTAMP());
    SELECT pgwar.update_type_label();
EOF

# Start entity label
print_timestamp "Starting entity_preview label..."
psql $DB_URL <<EOF
    INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('start entity_preview label', CLOCK_TIMESTAMP());
    SELECT pgwar.update_entity_preview_entity_label();
EOF

# Select from pgwar.initialization
print_timestamp "FINISHED PGWAR INIT"
psql $DB_URL <<EOF
INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('end', CLOCK_TIMESTAMP());
SELECT * FROM pgwar.initialization;
EOF
