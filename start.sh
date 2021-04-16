#!/usr/bin/env bash
trap 'kill %1; kill %2; kill %3;' SIGINT
(cd packages/cli && yarn start) | sed -e 's/^/[cli] /' & (cd packages/local-api && yarn start) | sed -e 's/^/[local-api] /' & (cd packages/local-client && yarn start) | sed -e 's/^/[local-client] /' & wait