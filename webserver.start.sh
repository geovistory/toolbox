set -e                  # exit when any command fails
bash ./server/db-migrate/up.sh # migrate up

node server/dist/webserver.js # start server
