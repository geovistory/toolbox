# poc-war-entity-label
This repository contains the code for the POC for creating entity_labels with built-in postgres functionality.

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

First start the docker container to run tests:

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