#!/bin/bash

# $1 = backup commit
# $2 = path to directory
# Usage: bash did-code-change.sh <$1> <$2>
# Example: bash did-code-change.sh d2d1721 src/warehouse
#
# exits with code 100 if no changes found in directory between HEAD and commit
# otherwise with code 200

[ ! -d "$2" ] && echo "Directory $2 DOES NOT exists." && exit 1

currentCommit=$(git rev-parse --short HEAD)

git diff --quiet $currentCommit $1 -- $2

if [ $? -eq 0 ]
then
  echo "No modifications found in directory $2 between current commit $currentCommit and commit $1."
  exit 100
else
  echo "Modifications found in directory $2 between current commit $currentCommit and commit $1."
  exit 200
fi
