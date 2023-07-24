# Geovistory Toolbox

The Virtual Research Environment of the Geovistory Ecosystem.

## Project Layout

This is a monorepo for server and client of the toolbox.

- `/server` contains all server code (node.js / LoopBack)
- `/client` contains all client code (angular)

## Development

### Setup the dev stack

Developing the toolbox server and client requires external components.
These are packed into a docker-compose file in the GitHub repo geovistory/dev-stack.

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

### Client Development

To develop the toolbox client, we need to set two env vars to match the URLs
of the dev stack.

- API_URL: The URL of the toolbox server api (for development usually hosted by dev-stack).
- ASSETS_URL: The URL of the server hosting the front-end assets (for development usually hosted by angular dev-server).

By default, the URLs in client/.env.example match the dev-stack and angular dev-server default configuration.

If you did not change the defaults, run:

```bash
cd client
npm run serve
```

This will copy the .env.example to .env and create the correct env.js in the angular app.

If you need to modify the API_URL or ASSETS_URL, edit the gitignored client/.env file.
