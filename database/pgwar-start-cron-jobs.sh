#!/bin/bash
set -e

# Define the database connection details
DB_URL="postgres://postgres:pw@localhost:15432/postgres"
TOOLBOX_DB="filled_db"

# Function to print the current timestamp and message
print_timestamp() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Schedule pgwar cron jobs
print_timestamp "Schedule pgwar cron jobs"
psql $DB_URL <<EOF

-- full texts
SELECT cron.schedule_in_database(
  'update-full-texts',
  '1 seconds',
  'SELECT pgwar.update_full_texts(1000)',
  '$TOOLBOX_DB'
);

-- community statements
SELECT cron.schedule_in_database(
  'update-community-statements-from-upserts',
  '1 seconds',
  'SELECT pgwar.update_community_statements_from_upserts()',
  '$TOOLBOX_DB'
);
SELECT cron.schedule_in_database(
  'update-community-statements-from-deletes',
  '1 seconds',
  'SELECT pgwar.update_community_statements_from_deletes()',
  '$TOOLBOX_DB'
);

-- entity class 
SELECT cron.schedule_in_database(
  'update-entity-class',
  '1 seconds',
  'SELECT pgwar.update_entity_class()',
  '$TOOLBOX_DB'
);

-- entity fk_type 
SELECT cron.schedule_in_database(
  'update-entity-fk-type',
  '1 seconds',
  'SELECT pgwar.update_fk_type()',
  '$TOOLBOX_DB'
);

-- entity class 
SELECT cron.schedule_in_database(
  'update-entity-type-label',
  '1 seconds',
  'SELECT pgwar.update_type_label()',
  '$TOOLBOX_DB'
);

-- Delete old cron.job_run_details records of the current user every day at noon
SELECT cron.schedule(
  'delete-job-run-details',
  '0 12 * * *',
  'DELETE FROM cron.job_run_details WHERE end_time < now() - interval ''1 day'''
);
EOF
