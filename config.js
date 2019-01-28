import { createConnection } from "typeorm";

// Set the varibles for development environment
require("dotenv").config();

export const firebaseConnection = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MENSSAGING_SENDER_ID
};

export const superSecretDiscordToken = {
  token: process.env.DISCORD_TOKEN
};

export let dbConnection;
export const projectVersion = require('./package.json').version;

/**
 * Makes postgree connection
 */
createConnection({
  type: "postgree",
  host: "",
  port: "",
  username: "",
  password: "",
  database: "",
  synchronize: true,
  logging: false,
  entities: [
    "src/entity/**/*.ts"
  ],
  migrations: [
    "src/migration/**/*.ts"
  ],
  subscribers: [
    "src/subscriber/**/*.ts"
  ],
  cli: {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}).then(connection => dbConnection = connection)
  .catch(error => console.log(error));