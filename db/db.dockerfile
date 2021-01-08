FROM postgis/postgis:12-2.5-alpine
RUN mkdir /logs
RUN chmod -R 777 /logs
COPY docker-db-init.sh /docker-entrypoint-initdb.d
