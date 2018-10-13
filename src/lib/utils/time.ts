/**
 * Returns the timestamp removing the miliseconds
 */
export function getTimeStampFormated(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Gets a number and transform it in a time formatted.
 * @example 3600 will become 01:00:00
 * @param number Element that will be converted
 */
export function getTime(number: number) {
  const hours = Math.floor(number / 3600);
  const minutes = Math.floor(number / 60);
  const sec = number % 60;
  return `${expand(hours)}:${expand(minutes)}:${expand(sec)}`;
}

/**
 * Get difference between two times returning the difference in minutes
 * @param time1 first number
 * @param time2 second number
 * @example time1 - time2
 */
export function getTimeDifference(time1: number, time2: number) {
  return time1 / 60 - time2 / 60;
}

/**
 * Checks if the number is less than 10, putting a 0 in front of him if
 * it be
 * @param number Element that will receive another decimal house
 */
function expand(number: number): string {
  return number < 10 ? `0${number}` : number.toString();
}
