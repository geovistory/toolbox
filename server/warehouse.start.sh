set -e                  # exit when any command fails
bash ./db-migrate/up.sh # migrate up
node dist/warehouse.js  # start server
