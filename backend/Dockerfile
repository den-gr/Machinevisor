FROM node:latest

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 8080

RUN npm run build

CMD npm run start & npm run machine_start