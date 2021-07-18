# #!/bin/bash

# This script returns the commit hash of the last commit
# that introduced a change to the directory given by -p flag

# usage example
# bash get-commit-of-folder.sh -p ../server/src/

# fetch argument from flag -p
while getopts p: flag; do
  case "${flag}" in
  p) path=${OPTARG} ;;
  esac
done
# echo "Path: $path"

# assign variables
currentCommit=$(git rev-parse HEAD)
i=0

# check if directory exists
[ ! -d "$path" ] && echo "Directory $path DOES NOT exists." && exit 1

# loop over old commits as long as no changes to current commit detected
# first iteration is over the current commit, so that the list starts with current commit
while [ $i -le 1000 ]; do
  commit=$(git rev-parse HEAD~$i)
  git diff --quiet $currentCommit $commit -- $path
  if [ $? -eq 1 ]; then
    # Modifications found in directory $path between $currentCommit and $commit
    # exit loop because from now on all next iterations will return a difference between the commits
    echo $commit
    exit
  fi
  i=$(($i + 1))
done
