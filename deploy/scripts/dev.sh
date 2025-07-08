#!/bin/bash
source ~/.nvm/nvm.sh
rm -rf node_modules
npm install
pm2 delete OUTLOOK_FRONTEND_DEV
pm2 start "npm run start:dev" -n "SMARTIN_FRONTEND_DEV"