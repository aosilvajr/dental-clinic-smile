FROM node:14
WORKDIR /usr/src/dental-clinic-smile
COPY ./package.json .
RUN yarn install --production=true
