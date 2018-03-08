FROM node:8-alpine

MAINTAINER ruimin.zhang "ruimin.zhang@baodanyun-inc.com"

EXPOSE 9001

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn
ADD . /app
RUN yarn build

CMD ["yarn", "docker:start"]