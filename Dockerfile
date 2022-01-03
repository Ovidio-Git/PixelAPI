FROM node:lts-alpine3.14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install nodemon
RUN npm install mongodb

COPY . .

EXPOSE 3000

CMD ["npx","nodemon","--legacy-watch","app.js"]