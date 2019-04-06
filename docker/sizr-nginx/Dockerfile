FROM nginx:1.15

RUN apt-get update
RUN apt-get install -y wget
RUN apt-get install -y procps
RUN apt-get install -y squid
RUN apt-get install -y apache2-utils

EXPOSE 8181

ENTRYPOINT ["sh", "/root/host/init.sh"]
