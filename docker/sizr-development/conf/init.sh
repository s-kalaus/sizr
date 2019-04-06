#!/bin/sh

npm i

cd frontend
npm i
cd ..
pm2 start --only frontend

sleep 20

mysql -hsizr-mysql-development -uroot -e "DROP DATABASE IF EXISTS sizr_development"
mysql -hsizr-mysql-development -uroot -e "CREATE DATABASE sizr_development DEFAULT CHARSET utf8"
mysql -hsizr-mysql-development -uroot -e "CREATE USER 'sizr_development'@'%' IDENTIFIED BY 'sizr_development'"
mysql -hsizr-mysql-development -uroot -e "GRANT ALL PRIVILEGES ON sizr_development.* TO 'sizr_development'@'%'"
node ./bin/db-create
node ./bin/db-fixture common development

pm2 start --only express
pm2 start --only graphql

tail -f /dev/null
