FROM node:latest

# Create Directory for the Container
WORKDIR /usr/herobot

COPY package.json .

# Grab dependencies and transpile src directory to dist
RUN npm install

COPY . .

RUN npm run build

# Start the server
CMD ["npm" , "bot"]
