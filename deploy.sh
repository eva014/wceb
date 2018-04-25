
#! /bin/bash
trap "echo Aborted!; exit;" SIGINT SIGTERM
set -e
echo 'begin deploy'

cnpm install
npm run build
chmod -R a+x dist/
rsync -avr dist/ root@167.99.77.92:/usr/share/nginx/html/



echo 'complete deploy'
