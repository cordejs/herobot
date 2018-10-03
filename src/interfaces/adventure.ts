import { Monster } from "./monster";

export interface Adventure {
  level: number;
  name: string;
  monsters: Monster[];
}
