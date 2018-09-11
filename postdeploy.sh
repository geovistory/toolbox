#!/bin/bash
bash heroku-prebuild.sh;
bash heroku-postbuild.sh;
node .;