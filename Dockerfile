FROM node:12
WORKDIR /usr/src/dental-clinic-smile
COPY ./package.json .
RUN yarn install --production=true
COPY ./dist ./dist
EXPOSE 5000
CMD yarn start
