#!/bin/bash

if [ $DB_ENV = 'review' ]
then
cd deployment && bash setup-review-db.sh
fi