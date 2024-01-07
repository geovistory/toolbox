#!/bin/bash

# Test .specs.ts
npx nx affected -t test
specsTests=$?

# Test .stories.ts interaction tests
npx nx run app-toolbox:build-storybook
npx concurrently -k -s first -n "SB,TEST" -c "magenta,blue" \
  "npx nx run app-toolbox:static-storybook --port=4400" \
  "npx wait-on tcp:4400 && npx nx run app-toolbox:test-storybook"

# Print test summary for .specs.ts
if [ $specsTests -eq 0 ]; then
  echo '>>>   All .specs.ts tests passed successfully!'
else
  echo '>>>   Some tests failed occurred'
  exit 1
fi

# Print test summary for .stories.ts
if [ $? -eq 0 ]; then
  echo '>>>   All .stories.ts tests passed successfully!'
else
  echo '>>>   Some tests failed occurred'
  exit 1
fi
