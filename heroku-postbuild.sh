#!/bin/bash

if [ $DB_ENV = 'review' ] || [ $DB_ENV = 'staging' ] || [ $DB_ENV = 'development' ]
then
  echo 'no postbuld / no: cd deployment && bash setup-db.sh '   # cd deployment && bash setup-db.sh
fi
