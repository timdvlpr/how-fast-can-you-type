FROM node:lts-alpine as development

ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]

