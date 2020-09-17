#!/bin/bash
#
# Helper script for developers:
# Restore reviewdb.backup on a local database
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

read -p 'File [reviewdb.backup]: ' filepath
filepath=${filepath:-reviewdb.backup}
echo $filepath
echo

read -p 'Number of parallel jobs [none]: ' jobs
jobs=${jobs:-none}
echo $jobs
echo

echo Your command: pg_restore -j 6 --no-owner -d postgres://$user:$password@$host:$port/$database $filepath --verbose
echo Attention: this action is irreversible! Schemas are dropped first
echo
while true; do
  read -p "Do you want to execute the command [y/n]?" yn
  case $yn in
  [Yy]*)

    echo '================= Drop schemas of target DB =============================='
    # We need to drop schemas before restoring because the review database may be
    # in an earlier state, created by deployment after previeous commit on the
    # same pull request
    time psql $DATABASE_URL -f dropSchemas.sql
    echo '================= Drop schemas done! ====================================='
    echo
    echo '======== Restore Database (from deployment/reviewdb.backup) ================='

    if [ $jobs = 'none' ]; then
      time pg_restore --no-owner -d postgres://$user:$password@$host:$port/$database $filepath --verbose
    else
      time pg_restore -j $jobs --no-owner -d postgres://$user:$password@$host:$port/$database $filepath --verbose
    fi
    echo '======== Database restored  =============================================='
    echo 'Consider to migrate up and to recreate warehouse'

    break
    ;;
  [Nn]*) exit ;;
  *) echo "Please answer yes or no." ;;
  esac
done
