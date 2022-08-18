#!/bin/bash

# This file is used by .github/workflows/warehouse-compat.yml
# to create server/warehouse-compat-list.txt
# The script generates a list of commits from the current commit
# backwards in history in order to list commits where warehouse
# was unchanged compared to current commit.

# exit when any command fails
set -e

# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG

# echo an error message before exiting
trap 'echo "\"${last_command}\" command filed with exit code $?."' EXIT

# assign variables
path=server/src/warehouse
output=server/warehouse-compat-list.txt
currentCommit=$(git rev-parse --short HEAD)
i=0

# check if warehouse directory exists
[ ! -d "$path" ] && echo "Directory $path DOES NOT exists." && exit 1

# remove output file (clean up)
rm -f $output

# loop over old commits as long as no changes to current commit detected
# first iteration is over the current commit, so that the list starts with current commit
while [ $i -le 1000 ]; do
  commit=$(git rev-parse --short @~$i)
  echo "i: $i, currentCommit: $currentCommit, commit: $commit, path: $path"
  diff=$(git diff $currentCommit $commit -- $path)

  # if [ $? -eq 0 ]; then
  if [ -z "$diff" ]; then
    # No modifications found in directory $path between $currentCommit and $commit.
    # Adding commit to list of commits where warehouse is compatible with current comit
    echo "found no diff to $commit"
    echo $commit >>$output
  else
    # Modifications found in directory $path between $currentCommit and $commit
    # exit loop because from now on all next iterations will return a difference between the commits
    echo "warehouse-compat-list.txt created"
    exit
  fi
  i=$(($i + 1))
done
