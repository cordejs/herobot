/**
 * Get a random number based in a range
 * @param min minimun value that the number can have
 * @param max maximun value that the number can have
 */
function randomNumber(min, max): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
