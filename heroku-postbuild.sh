#!/bin/bash

if [ $DB_ENV = 'review' ] || [ $DB_ENV = 'staging' ]
then
cd deployment && bash setup-db.sh
fi