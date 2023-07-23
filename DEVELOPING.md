# Developer's Guide

## Setup the dev stack

Developing the toolbox server and client requires external components.
These are packed into a docker-compose file in the GitHub repo geovistory/dev-stack.

Requirements:

- Docker (and docker-compose) installed.
- 8GB RAM for docker
- 4 CPUs for docker
- 100 GB disk space for docker

Donwload the stack:

```bash
git clone https://github.com/geovistory/dev-stack.git
```

Change the directory:

```bash
cd dev-stack
```

Start the stack (using docker-compose under the hood)

```bash
bash scripts/build
```

See more on https://github.com/geovistory/dev-stack.

## Develop toolbox client

To develop the toolbox client, we need to set two env vars:

- API_URL: The URL of the toolbox server api
- ASSETS_URL: The URL of the server hosting the front-end assets

When
