FROM ghcr.io/geovistory/toolbox-dev-db:l-1

RUN rm -R /logs
RUN mkdir /logs
RUN chmod -R 777 /logs
RUN rm -R /scripts
COPY scripts /scripts
RUN chmod -R 777 /scripts
