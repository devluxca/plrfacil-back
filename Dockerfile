FROM node:alpine

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
RUN yarn add ts-node-dev --dev

COPY . .

EXPOSE 3001

CMD ["yarn", "dev"]