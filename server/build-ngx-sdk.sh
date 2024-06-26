rm -r ../client/libs/lib-sdk-lb4/src/lib/sdk-lb4

############# download the openapi.json ################
curl http://0.0.0.0:3000/explorer/openapi.json \
  --output openapi.json

############## create the sdk ##################
./node_modules/.bin/openapi-generator-cli generate \
  -i openapi.json \
  -g typescript-angular \
  -o ../client/libs/lib-sdk-lb4/src/lib/sdk-lb4 \
  --additional-properties=\"ngVersion=9.1.13\" \
  --additional-properties=\"disallowAdditionalPropertiesIfNotPresent=false\"
