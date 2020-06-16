############# download the openapi.json ################
curl http://127.0.0.1:3000/explorer/openapi.json \
  --output openapi.json

############## create the sdk ##################
./node_modules/.bin/openapi-generator generate \
  -i openapi.json \
  -g typescript-angular \
  -o ../client/src/app/core/sdk-lb4 \
  --additional-properties=\"ngVersion=8.3.1\"