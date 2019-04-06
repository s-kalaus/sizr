FROM sizr-build:latest

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update
RUN apt-get install -y screen
RUN apt-get install -y mysql-client
RUN apt-get install -y google-chrome-stable
RUN apt-get install -y mc
RUN apt-get install -y htop

WORKDIR /var/www/sizr

ENTRYPOINT ["sh", "/root/host/init.sh"]
