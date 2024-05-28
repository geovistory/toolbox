FROM postgis/postgis:14-3.2

ENV PG_MAJOR 14
ENV PG_FULL 14.3.2

# Install the postgresql debugger
# Install pgtap
# Install build essential (needed by cpan)
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-$PG_MAJOR-pldebugger \
    postgresql-$PG_MAJOR-pgtap \
    build-essential

# Instal pg_prove
RUN cpan TAP::Parser::SourceHandler::pgTAP

RUN mkdir /logs
RUN chmod -R 777 /logs
COPY scripts /scripts
RUN chmod -R 777 /scripts
COPY init.sh /docker-entrypoint-initdb.d
