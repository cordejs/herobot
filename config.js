
// Set the varibles for development environment
require("dotenv").config();
import * as shields from "../../data/shield.json";

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




export const projectVersion = require('./package.json').version;