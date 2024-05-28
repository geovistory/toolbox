#!/bin/bash

echo "*********************************"
echo run seed


# Iterate over each file in the seed directory
for file in /seed/*; do
  # Check if it is a file (not a directory)
  if [ -f "$file" ]; then
    echo run seed $file
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DATABASE" -f $file
  fi
done
