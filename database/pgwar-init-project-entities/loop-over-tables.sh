#!/bin/bash
set -e

# Function to print the current timestamp and message
print_timestamp() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Define the database connection details
DB_URL="postgres://postgres:pw@localhost:15432/filled_db"
BATCH_SIZE=10000
CONCURRENT_TASKS=10

# Create initialization table if it doesn't exist
print_timestamp "Creating initialization table if it doesn't exist..."
psql $DB_URL <<EOF
CREATE TABLE IF NOT EXISTS pgwar.initialization (
    msg text,
    tmsp timestamp without time zone
);
EOF


# Function to process a table in batches
process_table() {
  local table_name=$1

  # Get the total number of rows in the table
  TOTAL_ROWS=$(psql $DB_URL --tuples-only --no-align -c "SELECT COUNT(*) FROM $table_name;")

  OFFSET=0
  while [ $OFFSET -lt $TOTAL_ROWS ]; do
    print_timestamp "Processing table $table_name with offset $OFFSET..."
        psql $DB_URL <<EOF
            INSERT INTO pgwar.initialization (msg, tmsp) VALUES ('Processing table $table_name with offset $OFFSET', CLOCK_TIMESTAMP()); 

            INSERT INTO pgwar.entity_preview(pk_entity, fk_project, fk_class, tmsp_fk_class_modification) 
            SELECT pk_entity, fk_project, fk_class, CURRENT_TIMESTAMP
            FROM $table_name LIMIT $BATCH_SIZE OFFSET $OFFSET
            ON CONFLICT DO NOTHING;
EOF

    OFFSET=$((OFFSET + BATCH_SIZE))
  done

  print_timestamp "Completed processing table $table_name."
}

# Start 10 parallel tasks
for i in $(seq 1 $CONCURRENT_TASKS); do
  TABLE_NAME="pgwar.temp_init_project_entities_$i"
  process_table $TABLE_NAME &
done

# Wait for all tasks to complete
wait
print_timestamp "All tasks completed."
