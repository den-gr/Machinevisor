FROM node:latest

WORKDIR /app

COPY ./angular-machinevisor .

RUN npm install @angular/cli
RUN npm install
RUN node_modules/.bin/ng build

EXPOSE 4200

CMD ["node_modules/.bin/ng", "serve", "--host", "0.0.0.0"]