FROM node:10-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

CMD ["npm", "start"]
