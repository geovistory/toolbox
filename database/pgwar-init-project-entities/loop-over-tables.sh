#!/bin/bash
set -e

# Define the database connection details
DB_URL="postgres://postgres:pw@localhost:15432/filled_db"
BATCH_SIZE=1000
CONCURRENT_TASKS=10

# Function to print the current timestamp and message
print_timestamp() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Create temp_project_entity_initialization table if it doesn't exist
print_timestamp "Creating temp_project_entity_initialization table if it doesn't exist..."
psql $DB_URL <<EOF
CREATE TABLE IF NOT EXISTS pgwar.temp_project_entity_initialization (
    msg text,
    tmsp timestamp without time zone
);
EOF

# Create table to store failed batches
print_timestamp "Creating table to store failed batches if it doesn't exist..."
psql $DB_URL <<EOF
CREATE TABLE IF NOT EXISTS pgwar.temp_project_entity_failed_batches (
    table_name text,
    _offset int,
    tmsp timestamp without time zone
);
EOF

# Truncate pgwar.temp_project_entity_initialization
print_timestamp "Truncating pgwar.temp_project_entity_initialization..."
psql $DB_URL <<EOF
TRUNCATE pgwar.temp_project_entity_initialization;
EOF

# Truncate pgwar.temp_project_entity_failed_batches
print_timestamp "Truncating pgwar.temp_project_entity_failed_batches..."
psql $DB_URL <<EOF
TRUNCATE pgwar.temp_project_entity_failed_batches;
EOF

# Function to process a table in batches
process_table() {
  local table_name=$1

  # Get the total number of rows in the table
  TOTAL_ROWS=$(psql $DB_URL --tuples-only --no-align -c "SELECT COUNT(*) FROM $table_name;")

  OFFSET=0
  while [ $OFFSET -lt $TOTAL_ROWS ]; do
    print_timestamp "Processing table $table_name with offset $OFFSET..."

    psql $DB_URL -c "INSERT INTO pgwar.temp_project_entity_initialization (msg, tmsp) VALUES ('Processing table $table_name with offset $OFFSET', CLOCK_TIMESTAMP());"

    # Attempt to execute the batch processing query
    if ! psql $DB_URL -c "
        INSERT INTO pgwar.entity_preview(pk_entity, fk_project, fk_class, tmsp_fk_class_modification) 
        SELECT pk_entity, fk_project, fk_class, CURRENT_TIMESTAMP
        FROM $table_name LIMIT $BATCH_SIZE OFFSET $OFFSET
        ON CONFLICT DO NOTHING;
    "; then
      # If the query fails, insert an error message into the initialization table
      psql $DB_URL -c "
        INSERT INTO pgwar.temp_project_entity_failed_batches (table_name, _offset, tmsp) 
        VALUES ('$table_name', $OFFSET, CLOCK_TIMESTAMP());
      "
    fi

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


# Function to process failed batches
process_failed_batches() {
  while :; do
    # Get the first failed batch
    FAILED_BATCH=$(psql $DB_URL --tuples-only --no-align -c "
      SELECT table_name, _offset FROM pgwar.temp_project_entity_failed_batches ORDER BY tmsp ASC LIMIT 1;
    ")

    # If no failed batch is found, exit the loop
    if [ -z "$FAILED_BATCH" ]; then
      break
    fi

    # Extract table_name and offset
    table_name=$(echo $FAILED_BATCH | cut -d '|' -f 1)
    offset=$(echo $FAILED_BATCH | cut -d '|' -f 2)

    print_timestamp "Re-processing failed batch for table $table_name with offset $offset..."

    # Attempt to reprocess the failed batch
    if psql $DB_URL -c "
        INSERT INTO pgwar.entity_preview(pk_entity, fk_project, fk_class, tmsp_fk_class_modification) 
        SELECT pk_entity, fk_project, fk_class, CURRENT_TIMESTAMP
        FROM $table_name LIMIT $BATCH_SIZE OFFSET $offset
        ON CONFLICT DO NOTHING;
    "; then
      # If successful, delete the record from temp_project_entity_failed_batches
      psql $DB_URL -c "
        DELETE FROM pgwar.temp_project_entity_failed_batches 
        WHERE table_name = '$table_name' AND _offset = $offset;
      "
      print_timestamp "Successfully re-processed and removed failed batch for table $table_name with offset $offset."
    else
      # If the reprocessing fails, log the failure and wait before retrying
      print_timestamp "Failed to re-process batch for table $table_name with offset $offset. Will retry..."
      sleep 10
    fi
  done
}


# Process any failed batches
process_failed_batches
print_timestamp "All failed batches processed."