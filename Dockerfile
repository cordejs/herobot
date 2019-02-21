FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package-lock.json /app
COPY package.json /app

RUN /usr/local/bin/npm install

COPY . /app

RUN /usr/local/bin/npm run build

COPY . .

ENTRYPOINT ["/usr/local/bin/npm"]
CMD ["npm" , "bot"]
