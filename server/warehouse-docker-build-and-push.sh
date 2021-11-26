#!/bin/bash

if [ -z "$(git status --porcelain)" ]; then 
 # Working directory clean
 echo 'GIT: working directory clean'
else 
 # Uncommitted changes
 echo 'GIT: Uncommitted changes, please cleanup directory first'
 exit 1
fi


COMMIT=$(git rev-parse --verify HEAD)
docker image build -f "warehouse.dockerfile" . \
  --build-arg "app_name=warehouse" \
  -t "docker.pkg.github.com/kleiolab/geovistory/warehouse:latest" \
  -t "docker.pkg.github.com/kleiolab/geovistory/warehouse:${COMMIT}"

docker push docker.pkg.github.com/kleiolab/geovistory/warehouse:${COMMIT}
