FROM node:latest

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 8080

RUN npm run build

CMD node bin/app.js "docker" & npm run machine_start