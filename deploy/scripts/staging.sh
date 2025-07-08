#!/bin/bash
source ~/.nvm/nvm.sh
rm -rf node_modules
npm install
pm2 delete SMARTIN_FRONTEND_DEV
pm2 start "npm run start:staging" -n "SMARTIN_FRONTEND_DEV"