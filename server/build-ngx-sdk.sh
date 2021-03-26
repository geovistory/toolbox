rm -r ../client/projects/lib-sdk-lb4/src/lib/sdk-lb4

############# download the openapi.json ################
curl http://0.0.0.0:3000/explorer/openapi.json \
  --output openapi.json

############## create the sdk ##################
./node_modules/.bin/openapi-generator-cli generate \
  -i openapi.json \
  -g typescript-angular \
  -o ../client/projects/lib-sdk-lb4/src/lib/sdk-lb4 \
  --additional-properties=\"ngVersion=8.3.1\" \
  --additional-properties=\"disallowAdditionalPropertiesIfNotPresent=false\"
