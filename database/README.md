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

If the create migration command fails with these errors
```
/home/username/toolbox/server/db-migrate/create.sh: 2: Bad substitution

/home/username/toolbox/toolbox/server/db-migrate/create.sh: 6: [[: not found

/home/username/toolbox/server/db-migrate/create.sh: 6: ==: not found

/home/username/toolbox/server/db-migrate/create.sh: 6: ==: not found
/home/username/toolbox/server/db-migrate/create.sh: 11: 
Syntax error: redirection unexpected
```

it could mean your bash interpreter is not "/bin/bash" but another one, like "dash" which come in distributions like Ubuntu.
To solve the issue, check first what really is your interpreter with:
```bash
ls -l /bin/sh
```
If the output gives a similar result to
```
lrwxrwxrwx 1 root root 4 May  1  2023 /bin/sh -> dash
```
then you should remove this symlink and create a new one pointing to the correct bash interpreter

```bash
sudo rm /bin/sh
sudo ln -s /bin/bash /bin/sh
```
Now the migration creation script should work properly 

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

### Prepare env

First Copy `.env.example` to `.env` and adjust the `POSTGRES_PORT` in case you have already a process listinging on this port.

### Run tests

On Linux / Mac

```bash
# To run unit tests:
bash ./test.sh -u
# To run integration tests:
bash ./test.sh -i
# To run performance tests:
bash ./test.sh -p
# To run any combination of tests, combine the flags. For example, to run both unit and integration tests:
bash ./test.sh -u -i
# To run all tests:
bash ./test.sh -u -i -p
```

On Windows

```powershell
# To run unit tests:
call ./test.bat -u
# To run integration tests:
call ./test.bat -i
# To run performance tests:
call ./test.bat -p
# To run any combination of tests, combine the flags. For example, to run both unit and integration tests:
call ./test.bat -u -i
# To run all tests:
call ./test.bat -u -i -p
```

## Setup CI

To setup CI, just run this command:

```bash
bash ./test.sh -u -i -p
```
