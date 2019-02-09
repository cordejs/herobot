import { createConnection, Connection } from "typeorm";
import * as conn from "./config";

/**
 * Responsable for all database functions
 */
export let dbConnection: Connection;

/**
 * Creates connection to database
 */
export function connect(): Promise<void> {
  let log: boolean = true;

  // Only enable log if is development environment
  if (process.env.NODE_ENV !== "DEV") {
    log = false;
  }

  console.log(conn.dbConfig.username);
  return createConnection({
    type: "postgres",
    host: conn.dbConfig.host,
    port: Number.parseInt(conn.dbConfig.port),
    username: conn.dbConfig.username,
    password: conn.dbConfig.password,
    database: conn.dbConfig.database,
    synchronize: true,
    logging: log,
    maxQueryExecutionTime: 20000,
    logger: "advanced-console",
    entities: ["./build/src/entity/**/*.js"],
    migrations: ["./build/src/migration/**.js"],
    subscribers: ["./build/src/subscriber/**/*.js"],
    cli: {
      migrationsDir: "./src/migration"
    }
  })
    .then(connection => {
      dbConnection = connection;
      console.log("> Connected to " + connection.options.database);
      console.log("Running migrations...");

      connection.runMigrations().then(migrations => {
        console.log("Finished migrations");
      });

      return Promise.resolve();
    })
    .catch(error => {
      console.log(error);
      return Promise.reject();
    });
}
