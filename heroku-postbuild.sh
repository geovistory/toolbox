#!/bin/bash

echo '================ Start of heroku-postbuild.sh =============================='

echo '================= Set environment variables for client ====================='
envsubst <./client/dist/app-toolbox/assets/env.template.js >./client/dist/app-toolbox/assets/env.js
echo 'client env vars'
cat ./client/dist/app-toolbox/assets/env.js

echo '================= Compile Server =============================='
cd ./server

echo './server: npm run build'
npm run build

echo './server: npm prune --production'
npm prune --production

echo '================= On dev =============================='
if [ $DB_ENV = 'dev' ]; then
    echo 'touch .env'
    touch .env

    echo 'npm i --production=false'
    npm i --production=false
fi

cd ..

echo '================ End of heroku-postbuild.sh ================================'
