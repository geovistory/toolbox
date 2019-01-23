#!/bin/bash


echo '======================== Run ng build --prod ======================'

if


echo ''
echo ''
echo '===================== Create angular sdk ========================'
echo '=====================        AND         ========================'
echo '===================== Build angular app  ========================='
echo ''
./node_modules/.bin/lb-sdk server/server client/src/app/core/sdk -d ng2web -i enabled && cd ./client && npm install && ng build --prod;
echo ''

echo ''

then

    echo '======================== ng build --prod Command succeeded ======================'
    echo '========================                                   ======================'
    echo '========================          Run git push             ======================'

    #cd ..;
    git status;
    git add .;
    read -p "Enter git commit message: " msg;
    echo ${msg};
    git commit -m "${msg}";
    git push;
else
    echo '======================== ng build --prod Command failed ======================'
fi




