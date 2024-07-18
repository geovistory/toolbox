#!/bin/bash
set -e

# Function to print the current timestamp and message
print_timestamp() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Define the database connection details
DB_URL="postgres://postgres:pw@localhost:15432/filled_db"

# Base query
BASE_QUERY="SELECT e.pk_entity, e.fk_class, ipr.fk_project FROM projects.info_proj_rel ipr, information.resource e WHERE e.pk_entity = ipr.fk_entity ORDER BY ipr.fk_project ASC"

# Get the total number of rows
print_timestamp "Counting total number of rows..."
TOTAL_ROWS=$(psql $DB_URL --tuples-only --no-align -c "SELECT COUNT(*) FROM ($BASE_QUERY) AS subquery;")

# Calculate rows per table
ROWS_PER_TABLE=$((TOTAL_ROWS / 10))
if (( TOTAL_ROWS % 10 != 0 )); then
  ROWS_PER_TABLE=$((ROWS_PER_TABLE + 1))
fi

print_timestamp "Total rows: $TOTAL_ROWS"
print_timestamp "Rows per table: $ROWS_PER_TABLE"

# Loop to create 10 tables
for i in $(seq 1 10); do
  OFFSET=$(( (i - 1) * ROWS_PER_TABLE ))
  TABLE_NAME="pgwar.temp_init_project_entities_$i"

  print_timestamp "Creating table $TABLE_NAME with offset $OFFSET..."

  psql $DB_URL <<EOF
  DROP TABLE IF EXISTS $TABLE_NAME;
  CREATE TABLE $TABLE_NAME AS
  SELECT * FROM (
    $BASE_QUERY
    LIMIT $ROWS_PER_TABLE OFFSET $OFFSET
  ) AS subquery;
EOF

  print_timestamp "Table $TABLE_NAME created."
done

print_timestamp "All tables created."
