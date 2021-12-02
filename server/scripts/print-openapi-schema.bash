############# download the openapi.json ################
curl http://0.0.0.0:3000/explorer/openapi.json | jq '.components.schemas.ReplaceStatementInFieldRequest'

#curl http://0.0.0.0:3000/explorer/openapi.json | jq '.components.schemas.CommunityVisibilityOptionsWithRelations'
