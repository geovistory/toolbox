#!/bin/bash

echo '================ Start of heroku-postbuild.sh =============================='

echo '================= Compile Server =============================='
cd ./server

echo './server: npm run build'
npm run build

echo './server: npm prune --production'
npm prune --production

cd ..
echo '================ End of heroku-postbuild.sh ================================'
