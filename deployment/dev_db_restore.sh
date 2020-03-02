#!/bin/bash
#
# Helper script for developers:
# Restore reviewdb.tar on a local database
#

read -p 'Username [postgres]: ' user
user=${user:-postgres}
echo $user
echo

read -p 'Password [GuruAtMarly]: ' password
password=${password:-GuruAtMarly}
echo $password
echo

read -p 'Host [localhost]: ' host
host=${host:-localhost}
echo $host
echo

read -p 'Port [5432]: ' port
port=${port:-5432}
echo $port
echo

read -p 'Database [dev1]: ' database
database=${database:-dev1}
echo $database
echo

read -p 'File [reviewdb.tar]: ' filepath
filepath=${filepath:-reviewdb.tar}
echo $filepath
echo

echo Your command: pg_restore --no-owner -d postgres://$user:$password@$host:$port/$database $filepath --clean --verbose
echo Attention: this action is irreversible!
echo
while true; do
  read -p "Do you want to execute the command [y/n]?" yn
  case $yn in
  [Yy]*)
    time pg_restore --no-owner -d postgres://$user:$password@$host:$port/$database $filepath --clean --verbose
    break
    ;;
  [Nn]*) exit ;;
  *) echo "Please answer yes or no." ;;
  esac
done
