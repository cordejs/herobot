FROM node:10

RUN mkdir -p /app
WORKDIR /app

COPY package-lock.json /app
COPY package.json /app

RUN /usr/local/bin/npm install --production

COPY . /app

RUN /usr/local/bin/npm run build

ENTRYPOINT ["/usr/local/bin/npm"]
CMD ["start"]
