#!/bin/bash

echo '================ Start of heroku-postbuild.sh =============================='

echo '================= Compile Server =============================='
cd ./server

echo './server: npm run build'
npm run build

echo './server: npm prune --production'
npm prune --production

cd ..

echo '================= On dev =============================='
if [ $DB_ENV = 'dev' ]; then
    npm i dotenv
fi


echo '================ End of heroku-postbuild.sh ================================'
