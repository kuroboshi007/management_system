#!/bin/bash
echo "\033[34m start... \033[0m"
yarn generate
echo "\033[32m starting upload the dist folder!!! \033[0m"
cp -r dist/* /Users/tmac/Desktop/xiaobu-manage-web-server/src/main/resources/templates/
cd /Users/tmac/Desktop/xiaobu-manage-web-server
git add .
git commit -m 'new release'
git pull origin master
git push origin master
echo "\033[32m success!!! \033[0m"

