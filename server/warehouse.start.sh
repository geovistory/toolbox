set -e # exit when any command fails

# bash ./db-migrate/up.sh # migrate up

# Check if there are migrations to run.
CHECK_OUTPUT=$(bash ./up.sh --check)
echo $CHECK_OUTPUT
if [[ $CHECK_OUTPUT =~ 'No migrations to run' ]]; then
  # If no migations to run, we continue
  echo '[INFO] No migrations to run, continue...'
else
  # Else we exit, and kubernetes will restart this process.
  echo '[WARN] There are migrations to run'
  echo $CHECK_OUTPUT
  echo
  echo '[WARN] exit...'
  exit 1
fi

node dist/warehouse.js # start server
