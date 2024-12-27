FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY . .

EXPOSE 5000

CMD ["ng", "serve", "--host", "0.0.0.0"]