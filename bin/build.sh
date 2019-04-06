#!/bin/sh

BUILD_ENV=${1:-prod}
BUILD_ID=${2:-1}
BUILD_ID_BASE="0"
VERSION="${BUILD_ENV}-v${BUILD_ID_BASE}.${BUILD_ID}"

#frontend
cd frontend
npm i
npm run ${BUILD_ENV}
cd ..

#copy release
mkdir ~/.ssh
chmod 700 ~/.ssh
ssh-keyscan -p 2222 -t rsa kalaus.ru > ~/.ssh/known_hosts
cp ./.ssh/id_rsa ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
mkdir .release
cd .release
git init
git remote add origin ssh://git@kalaus.ru:2222/kalaus/sizr-release.git
git config core.autocrlf true
git config user.name "gitlab"
git config user.email "sergey.kalaus+gitlab@gmail.com"
git fetch origin ${BUILD_ENV}
git checkout ${BUILD_ENV}
git rm -rf .
git clean -fxd
cd ..
cp -R bin config docker express graphql lib model node_modules service ssl view fork Makefile package.json public .release
cd .release
git add .
git commit -am ${VERSION}
git tag ${VERSION}
git push origin ${BUILD_ENV}
git push origin ${VERSION}
