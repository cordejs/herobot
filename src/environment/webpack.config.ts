/**
 * We only export a single thing. The config.
 */
export let config;

/**
 * `process.env.NODE_ENV` definition is driven from webpack
 *
 * The whole `else` block will be removed in the emitted JavaScript
 *  for a production build
 */
if (process.env.NODE_ENV === "production") {

  console.log("Running in prod");
} else {
  console.log("Running in test");
}
