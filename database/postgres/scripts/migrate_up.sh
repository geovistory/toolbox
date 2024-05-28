#!/bin/bash

echo "*********************************"
echo run migrations


# Iterate over each file in the migrations directory
for file in /migrations/*; do
  # Check if it is a file (not a directory)
  if [ -f "$file" ]; then
    echo run migration $file
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DATABASE" -f $file
  fi
done
