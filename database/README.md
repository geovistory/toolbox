# Database

This folder contains all code to develop and test the postgres database of geovistory.

## Add a database migration

Whenever you modify the database schema, create a migration file.

```bash
# Change into server directory
cd ../server
# Install node modules (if not yet done)
npm i
# create .env (if not yet done)
cp .env.example .env
# create migration
npm run db:cm name-of-migration
# this will create a *-up.sql and a *-down.sql
# - in *-up.sql, add your modifications
# - in *-down.sql, revert your modifications
```

## Write tests

Add pgTap files ending on .sql to one of these folders:

```bash
test/
├── integration/ # test collaboration of multiple triggers/functions
├── performance/ # test performance e.g. with perform_ok() or perform_within()
├── units/
    ├── functions/ # test a single function
    ├── triggers/ # test a single trigger
```

## Testing

First Copy `.env.example` to `.env` and adjust the `POSTGRES_PORT` in case you have already a process listinging on this port.

Start the docker container to run tests:

```bash
# Linux / Mac
bash docker_compose_up.sh

# Windows
call docker_compose_up.bat
```

This will start the testing container with postgres and test scripts.

Then you run one of the following commands:

### Run unit and integration tests

```bash
# Linux / Mac
bash test_units.sh && bash test_integration.sh
# Windows
call test_units.bat && call test_integration.bat
```

### Run performance tests

These scripts will call function that seeds the db with 1mio statements and may take while.

```bash
# Linux / Mac
bash test_performance.sh
# Windows
call test_performance.bat
```

## Setup CI

To setup CI, just run these commands:

```bash
bash docker_compose_up.sh && bash test_all.sh
```
