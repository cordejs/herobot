export function getTimeStampFormated(): number {
  return Math.floor(Date.now() / 1000);
}

export function getTime(number: number) {
  const hours = Math.floor(number / 3600);
  const minutes = Math.floor(number / 60);
  const sec = number % 60;
  return `${expand(hours)}:${expand(minutes)}:${expand(sec)}`;
}

function expand(number: number): string {
    return (number < 10) ? `0${number}` : number.toString();
}