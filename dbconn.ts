import { createConnection, Connection } from "typeorm";

/**
 * Responsable for all database functions
 */
export let dbConnection: Connection;

export function connect(): Promise<void> {
  let log: boolean = true;

  // Only enable log if is development environment
  if (process.env.NODE_ENV !== "DEV") {
    log = false;
  }

  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "botdb",
    synchronize: false,
    logging: log,
    maxQueryExecutionTime: 20000,
    migrationsRun: true,
    logger: "advanced-console",
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
  }).then(connection => {
    dbConnection = connection;
    console.log("> Connected to " + connection.options.database);
    return Promise.resolve();
  }).catch(error => {
    console.log(error);
    return Promise.reject();
  });
}
