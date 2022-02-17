set -e # exit when any command fails

# bash ./db-migrate/up.sh # migrate up

# Wait, if there are migrations to run.
CHECK_OUTPUT=$(bash ./up.sh --check)
while [[ $CHECK_OUTPUT =~ '[INFO] Migrations to run:' ]]; do
  echo "Waiting for database to be migrated up..."
  sleep 2
  CHECK_OUTPUT='$(bash ./up.sh --check)'
done

echo "Database is ready, starting warehouse server..."
node dist/warehouse.js # start server
