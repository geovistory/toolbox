FROM ghcr.io/geovistory/toolbox-dev-db:m-4

RUN rm -Rf /logs
RUN mkdir /logs
RUN chmod -R 777 /logs
RUN rm -Rf /scripts
COPY scripts /scripts
RUN chmod -R 777 /scripts
