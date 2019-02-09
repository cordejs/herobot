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
