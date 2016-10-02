FROM node
MAINTAINER Pablo Castro <castrinho8@gmail.com>

RUN apt-get -y update && apt-get install -y nodejs && apt-get install -y npm
RUN mkdir -p /usr/adasmus
COPY . /usr/adasmus

WORKDIR /usr/adasmus
RUN npm install

EXPOSE 3000

CMD npm run start
