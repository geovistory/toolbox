#!/bin/bash

if [ $DB_ENV = 'review' ] || [ $DB_ENV = 'staging' ] || [ $DB_ENV = 'development' ]
then
   # cd deployment && bash setup-db.sh
fi
