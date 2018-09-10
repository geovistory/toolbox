#!/bin/bash

echo ''
echo ''
echo '===================== Create angular sdk ========================'
echo ''
./node_modules/.bin/lb-sdk server/server client/src/app/core/sdk -d ng2web -i enabled
echo ''
echo ''
echo '===================== Build angular app ========================='
cd ./client
npm install && ng build --prod
echo ''
echo ''




