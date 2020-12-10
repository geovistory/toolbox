# Developer's Guide

We use Visual Studio Code for developing LoopBack and recommend the same to our
users.



## Docker 
Docker is used to create images for the different components of Geovistory:
- webserver
- warehouse

(The postgres database is part of the Geovistory stack but we can use existing docker images for setting up postgres.)

## Docker compose
Docker-compose helps to setup a stack. This is usefull for local development.  

### Docker-compose files 
- `docker-compose.no-webserver.yaml` contains only the layers we don't develop ourselfs. Currently only postgres. This is useful for __development of webserver__.
- `docker-compose.no-warehouse.yaml` contains only the layers we don't develop ourselfs. Currently only postgres. This is useful for __development of warehouse__.
- `docker-compose.base.yaml` contains only the layers we don't develop ourselfs. Currently only postgres. This is useful for __development of webserver and warehouse__.
- `docker-compose.all-local.yaml` contains all layers of stack including  webserver and warehouse. This is useful to verify if the built images run.


## Environment variables
To configure docker-compose we use the approched discussed here:
http://blog.code4hire.com/2018/06/define-named-volume-with-host-mount-in-the-docker-compose-file/

The docker-compose files substitute certain values with env vars. These env vars can be defined in .env file.

### Docker-compose commands
To build a project run the following cmd:
```sh
docker-compose --project-name geov_stack --file docker-compose.all-local.yaml up -d
docker-compose --project-name geov_base --file docker-compose.base.yaml up -d
```


To rebuild images of project
```sh
# just rebuild
docker-compose --project-name geov_stack --file docker-compose.all-local.yaml build
docker-compose --project-name geov_base --file docker-compose.base.yaml build
# rebuild and run in background
docker-compose --project-name geov_stack --file docker-compose.all-local.yaml up --build -d
docker-compose --project-name geov_base --file docker-compose.base.yaml up --build -d
```


To stop project
```sh
docker-compose --project-name geov_stack --file docker-compose.all-local.yaml down
docker-compose --project-name geov_base --file docker-compose.base.yaml down
```

NOTE: When you start the first time it may lead to an error because the database is not ready while beeing accessed from webserver. Just stop and start again. 

## Access the database
To see the port of the database, starte the stack (see above) and run
```sh
# lists the running containers
docker ps

# output (similar): see here geovistory_db_1 is exposed at port 5005 to host machine

# CONTAINER ID        IMAGE                          COMMAND        ...  PORTS                   NAMES
# d3a0aa46d80b        geovistory_web                 "docker-en…"   ...  0.0.0.0:3000->3000/tcp  geovistory_web_1
# 02ea63d4cec2        postgis/postgis:12-2.5-alpine  "docker-en…"   ...  0.0.0.0:5005->5432/tcp  geovistory_db_1
```

