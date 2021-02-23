#!/usr/bin/env sh
# abort on errors
set -e
# build
npm run build
# navigate into the build output directory
cd dist
cp index.html 404.html

git init
git add -A
git commit -m 'deploy to gh-pages'
git remote add origin https://github.com/drahuld/spacex.git
git push origin -u git@github.com:drahuld/spacex.git main:gh-pages
cd -