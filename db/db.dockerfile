FROM postgis/postgis:12-2.5-alpine
COPY docker-db-init.sh /docker-entrypoint-initdb.d
