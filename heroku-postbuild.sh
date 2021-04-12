#!/bin/bash

echo '================ Start of heroku-postbuild.sh =============================='

echo '================= Compile Server =============================='
cd ./server

echo './server: npm run build'
npm run build

echo './server: npm prune --production'
npm prune --production

cd ..



echo '================= Seed DB if dev =============================='
if [ $DB_ENV='dev' ]; then
    npm run db:seed-dev
fi


echo '================ End of heroku-postbuild.sh ================================'
