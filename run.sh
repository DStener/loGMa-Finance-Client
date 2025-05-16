#!/bin/bash

npm run build

yes | cp -rf dist/* ../loGMa-Finance-Server/root/

sh ../loGMa-Finance-Server/run.sh