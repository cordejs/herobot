import { Monster } from "./monster";

export interface Adventure {
  id?: string;
  level: number;
  name: string;
  idMonster: number;
}
