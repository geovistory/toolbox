#!/bin/bash

touch ./tmp/init

echo setup debugger
echo shared_preload_libraries = 'plugin_debugger' >> /var/lib/postgresql/data/postgresql.conf 

# Wait for PostgreSQL to start
wait_postgresql() {
    while ! pg_isready -q; do
        echo "Waiting for PostgreSQL to start..."
        sleep 1
    done
}
wait_postgresql

bash scripts/create_test_db.sh

chmod 0777 ./var/lib/postgresql/data/

echo Mark as ready
touch ./var/lib/postgresql/data/ready

