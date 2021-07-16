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
docker image build -f "webserver.dockerfile" . \
  --build-arg "app_name=webserver" \
  -t "docker.pkg.github.com/kleiolab/geovistory/webserver:latest" \
  -t "docker.pkg.github.com/kleiolab/geovistory/webserver:${COMMIT}"

docker push docker.pkg.github.com/kleiolab/geovistory/webserver:${COMMIT}
