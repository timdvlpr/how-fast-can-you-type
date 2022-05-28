FROM node:lts-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]
